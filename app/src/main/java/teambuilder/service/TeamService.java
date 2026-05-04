package teambuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teambuilder.model.CharacterTeamModel;
import teambuilder.repository.TeamRepository;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private CharacterService characterService;

    public List<CharacterTeamModel> getAllTeams() {
        return teamRepository.findAll().stream().map(team -> new CharacterTeamModel(
                team.getId(),
                team.getName(),
                team.getDescription(),
                characterService.findBasicCharacterByName(team.getCharacter1()),
                characterService.findBasicCharacterByName(team.getCharacter2()),
                characterService.findBasicCharacterByName(team.getCharacter3()),
                characterService.findBasicCharacterByName(team.getCharacter4())
        )).toList();
    }
}
