package teambuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teambuilder.model.User;
import teambuilder.repository.GeneralRepository;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private GeneralRepository teamRepository;
    @Autowired
    private CharacterService characterService;
    @Autowired
    private UserService userServiceService;

    public List<teambuilder.model.General> getAllTeams() {{
        return teamRepository.findAll();
    }

    public teambuilder.model.General reportTeam(String id, ReportTeamRequest request) {
       User user = userServiceService.getUserById(id);
         if (user == null) {
              throw new RuntimeException("User not found");
         }
         String category = request.category();
         // if team alrady exists then add +1 to the score



    }
}
