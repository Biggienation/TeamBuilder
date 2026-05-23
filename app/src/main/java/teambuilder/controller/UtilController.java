package teambuilder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teambuilder.service.UtilService;

import java.io.IOException;

@RestController
@RequestMapping("/api/util")
@CrossOrigin(origins = "*")
public class UtilController {

    @Autowired
    private UtilService utilService;

    @GetMapping("/profileicons")
    public ResponseEntity<String[]> getProfileIcons() throws IOException {
            String[] icons = utilService.getProfileIcons();
            return ResponseEntity.ok(icons);
    }
}
