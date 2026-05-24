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
    @Autowired private UserRepository userRepository;
    @Autowired private ApocalypticShadowRepository apocalypticShadowRepository;
    @Autowired private AnomalyArbitrationRepository anomalyArbitrationRepository;
    @Autowired private PureFictionRepository pureFictionRepository;
    @Autowired private MemoryOfChaosRepository memoryOfChaosRepository;

    public List<General> getAllGeneral() {
        return generalRepository.findAll();
    }
    public List<MemoryOfChaos> getAllMemoryOfChaos() {
        return memoryOfChaosRepository.findAll();
    }

    public List<PureFiction> getAllPureFiction() {
        return pureFictionRepository.findAll();
    }

    public List<ApocalypticShadow> getAllApocalypticShadow() {
        return apocalypticShadowRepository.findAll();
    }

    public List<AnomalyArbitration> getAllAnomalyArbitration() {
        return anomalyArbitrationRepository.findAll();
    }

    public void reportTeam(String userId, ReportTeamRequest request) throws Exception {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new RuntimeException("User not found");

        String category = request.category();

        switch (category) {
            case "Apocalyptic Shadow" -> handleReport(
                    request,
                    apocalypticShadowRepository,
                    user.getApocalypticShadow(),
                    user::setApocalypticShadow,
                    ApocalypticShadow::new
            );
            case "Anomaly Arbitration" -> handleReport(
                    request,
                    anomalyArbitrationRepository,
                    user.getAnomalyArbitraton(),
                    user::setAnomalyArbitraton,
                    AnomalyArbitration::new
            );
            case "Pure Fiction" -> handleReport(
                    request,
                    pureFictionRepository,
                    user.getPureFiction(),
                    user::setPureFiction,
                    PureFiction::new
            );
            case "Memory of Chaos" -> handleReport(
                    request,
                    memoryOfChaosRepository,
                    user.getMemoryOfChaos(),
                    user::setMemoryOfChaos,
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
        if (previousVoteId != null) {
            repository.findById(previousVoteId).ifPresent(prev -> {
                prev.setScore(prev.getScore() - 1);
                if (prev.getScore() <= 0) {
                    repository.delete(prev);
                } else {
                    repository.save(prev);
                }
            });
        }

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

        setVote.accept(saved.getId());
    }
}
