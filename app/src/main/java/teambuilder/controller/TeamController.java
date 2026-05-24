package teambuilder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teambuilder.dto.ReportTeamRequest;
import teambuilder.model.General;
import teambuilder.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public ResponseEntity<List<CharacterTeamModel>> getAllTeams() {
        List<CharacterTeamModel> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @PutMapping("/{id}/report")
    public ResponseEntity<General> reportTeam(@PathVariable String id, @RequestBody ReportTeamRequest request) {
        General updated = teamService.reportTeam(id, request);
        return ResponseEntity.ok(updated);
    }

}
