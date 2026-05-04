package teambuilder.config;

import teambuilder.model.Character;
import teambuilder.model.Team;
import teambuilder.model.User;
import teambuilder.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import teambuilder.repository.TeamRepository;
import teambuilder.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@Component
public class DataInitializer {

    @Autowired
    private CharacterRepository characterRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeData() {
        InitializeDevUser();
        InitializeCharacters();
        InitializeTeams();
    }

    private void InitializeDevUser() {
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@test.com");
            adminUser.setPassword(passwordEncoder.encode("test"));
            adminUser.setActive(true);
            userRepository.save(adminUser);
        }
    }

    private void InitializeCharacters() {
        if (characterRepository.count() == 0) {
            try {
                Character[] characters = loadCharactersFromJson();
                characterRepository.saveAll(Arrays.asList(characters));
            } catch (IOException e) {
                System.err.println("Error loading characters from JSON: " + e.getMessage());
            }
        }
    }

    private void InitializeTeams() {
        if (teamRepository.count() == 0) {
            try {
                Team[] teams = loadTeamsFromJson();
                teamRepository.saveAll(Arrays.asList(teams));
            } catch (IOException e) {
                System.err.println("Error loading teams from JSON: " + e.getMessage());
            }
        }
    }

    private Character[] loadCharactersFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("data/Charaters.JSON");
        return objectMapper.readValue(resource.getInputStream(), Character[].class);
    }

    private Team[] loadTeamsFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("data/Teams.JSON");
        return objectMapper.readValue(resource.getInputStream(), Team[].class);
    }
}
