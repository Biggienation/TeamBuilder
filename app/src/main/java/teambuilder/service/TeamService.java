package teambuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teambuilder.model.Team;
import teambuilder.repository.TeamRepository;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}
