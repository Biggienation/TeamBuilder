package teambuilder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teambuilder.dto.ReportTeamRequest;
import teambuilder.model.*;
import teambuilder.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/general")
    public ResponseEntity<List<General>> getAllGeneral() {
        return ResponseEntity.ok(teamService.getAllGeneral());
    }

    @GetMapping("/memoryofchaos")
    public ResponseEntity<List<MemoryOfChaos>> getAllMemoryOfChaos() {
        return ResponseEntity.ok(teamService.getAllMemoryOfChaos());
    }

    @GetMapping("/purefiction")
    public ResponseEntity<List<PureFiction>> getAllPureFiction() {
        return ResponseEntity.ok(teamService.getAllPureFiction());
    }

    @GetMapping("/apocalypticshadow")
    public ResponseEntity<List<ApocalypticShadow>> getAllApocalypticShadow() {
        return ResponseEntity.ok(teamService.getAllApocalypticShadow());
    }

    @GetMapping("/anomalyarbitration")
    public ResponseEntity<List<AnomalyArbitration>> getAllAnomalyArbitration() {
        return ResponseEntity.ok(teamService.getAllAnomalyArbitration());
    }

    @PutMapping("/{id}/report")
    public ResponseEntity<Void> reportTeam(@PathVariable String id, @RequestBody ReportTeamRequest request) throws Exception {
        teamService.reportTeam(id, request);
        return ResponseEntity.ok().build();
    }

}
