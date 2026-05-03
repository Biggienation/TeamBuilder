package teambuilder.config;

import teambuilder.model.Character;
import teambuilder.model.Team;
import teambuilder.model.User;
import teambuilder.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import teambuilder.repository.TeamRepository;
import teambuilder.repository.UserRepository;

import java.util.Arrays;

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
        // Initialize test user
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@test.com");
            adminUser.setPassword(passwordEncoder.encode("test"));
            adminUser.setActive(true);
            userRepository.save(adminUser);
        }

        // Check if data already exists
        Character anaxa = new Character("1", "Anaxa", "SS", "5-star", "Wind", "Erudition","Sub-DPS","https://img.game8.co/4105938/a7a620b0c9969474e506afc27d57874b.png/show", "test");
        Character castorice = new Character("2", "Castorice", "SS", "5-star", "Quantum", "Remembrance","Main-DPS","https://img.game8.co/4104674/c7d4833be32744623796e69cd8955443.png/show", "test");
        Character tribbie = new Character("3", "Tribbie", "SS", "5-star", "Quantum", "Harmony","Support","https://img.game8.co/4074798/ca2244bb4304b47283f0c7d2593a404c.png/show", "test");
        Character mydei = new Character("4", "Mydei", "S", "5-star", "Imaginary", "Destruction","Sub-DPS","https://img.game8.co/4074811/d8f806b8713b2d167e2671c4b99278e7.png/show", "test");
        Character theHerta = new Character("5", "The Herta", "SS", "5-star", "Ice", "Erudition","Main-DPS","https://img.game8.co/4044949/9986df56ea421e73acd7201b3efe5a22.png/show", "test");
        Character acheron = new Character("6", "Acheron", "S", "5-star", "Lightning", "Nihility","Main-DPS","https://img.game8.co/3899367/9cedf24bc0ce960e0b3973250dd28c76.png/show", "test");
        Character himeko = new Character("7", "Himeko", "A", "5-star", "Fire", "Erudition","Sub-DPS","https://img.game8.co/3899451/579d23b3f6ec047cf5ace13a5d17720c.png/show", "test");
        Character hyacine = new Character("8", "Hyacine", "SS", "5-star", "Wind", "Remembrance","Support","https://img.game8.co/4137692/d5bcdd1e7f7a9543dffcdd702e19926a.png/show", "test");


        Team theHertaTeam = new Team("1", "The Herta Team", "test", theHerta, anaxa, tribbie, hyacine);

        if (characterRepository.count() == 0) {
            characterRepository.saveAll(Arrays.asList(anaxa, castorice, tribbie, mydei, theHerta, acheron, himeko, hyacine));
        }

        if (teamRepository.count() == 0) {
            teamRepository.save(theHertaTeam);
        }
    }
}
