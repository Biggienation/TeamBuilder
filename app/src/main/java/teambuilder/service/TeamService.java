package teambuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import teambuilder.dto.ReportTeamRequest;
import teambuilder.model.*;
import teambuilder.repository.*;

import java.util.List;

@Service
public class TeamService {

    @Autowired private GeneralRepository generalRepository;
    @Autowired private CharacterService characterService;
    @Autowired private UserService userService;
    @Autowired private ApocalypticShadowRepository apocalypticShadowRepository;
    @Autowired private AnomalyArbitrationRepository anomalyArbitrationRepository;
    @Autowired private PureFictionRepository pureFictionRepository;
    @Autowired private MemoryOfChaosRepository memoryOfChaosRepository;
    @Autowired private UserRepository userRepository;

    public List<General> getAllTeams() {
        return generalRepository.findAll();
    }

    public void reportTeam(String userId, ReportTeamRequest request) throws Exception {
        User user = userService.getUserById(userId);
        if (user == null) throw new RuntimeException("User not found");

        String category = request.category();

        switch (category) {
            case "Apocalyptic Shadow" -> handleReport(
                    request,
                    apocalypticShadowRepository,
                    user.getApocalypticShadowVote(),
                    (vote) -> user.setApocalypticShadowVote(vote),
                    ApocalypticShadow::new
            );
            case "Anomaly Arbitration" -> handleReport(
                    request,
                    anomalyArbitrationRepository,
                    user.getAnomalyArbitrationVote(),
                    (vote) -> user.setAnomalyArbitrationVote(vote),
                    AnomalyArbitration::new
            );
            case "Pure Fiction" -> handleReport(
                    request,
                    pureFictionRepository,
                    user.getPureFictionVote(),
                    (vote) -> user.setPureFictionVote(vote),
                    PureFiction::new
            );
            case "Memory of Chaos" -> handleReport(
                    request,
                    memoryOfChaosRepository,
                    user.getMemoryOfChaosVote(),
                    (vote) -> user.setMemoryOfChaosVote(vote),
                    MemoryOfChaos::new
            );
            default -> throw new RuntimeException("Unknown category: " + category);
        }

        userRepository.save(user);
    }

    private <T extends BaseTeam> void handleReport(
            ReportTeamRequest request,
            MongoRepository<T, String> repository,
            String previousVoteId,
            java.util.function.Consumer<String> setVote,
            java.util.function.Supplier<T> constructor
    ) {
        // Remove +1 from previous vote if user already voted
        if (previousVoteId != null) {
            repository.findById(previousVoteId).ifPresent(prev -> {
                prev.setScore(prev.getScore() - 1);
                repository.save(prev);
            });
        }

        // Find existing team matching the 4 characters or create a new one
        T team = repository.findAll().stream()
                .filter(t ->
                        t.getCharacter1().equals(request.character1()) &&
                                t.getCharacter2().equals(request.character2()) &&
                                t.getCharacter3().equals(request.character3()) &&
                                t.getCharacter4().equals(request.character4())
                )
                .findFirst()
                .orElseGet(() -> {
                    T newTeam = constructor.get();
                    newTeam.setName(request.name());
                    newTeam.setCharacter1(request.character1());
                    newTeam.setCharacter2(request.character2());
                    newTeam.setCharacter3(request.character3());
                    newTeam.setCharacter4(request.character4());
                    newTeam.setScore(0);
                    return newTeam;
                });

        team.setScore(team.getScore() + 1);
        T saved = repository.save(team);

        // Update user's vote reference for this category
        setVote.accept(saved.getId());
    }
}
