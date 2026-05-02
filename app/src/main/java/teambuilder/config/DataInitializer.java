package teambuilder.config;

import teambuilder.model.Character;
import teambuilder.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer {

    @Autowired
    private CharacterRepository characterRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeData() {
        // Check if data already exists
        if (characterRepository.count() == 0) {
            Character ch1 = new Character("1", "Warrior", "S", 10, "Tank", "/images/warrior.jpg", "A powerful warrior");
            Character ch2 = new Character("2", "Mage", "A", 8, "DPS", "/images/mage.jpg", "Master of spells");
            Character ch3 = new Character("3", "Rogue", "A", 9, "DPS", "/images/rogue.jpg", "Quick and deadly");
            Character ch4 = new Character("4", "Paladin", "S", 10, "Support", "/images/paladin.jpg", "Holy protector");
            Character ch5 = new Character("5", "Ranger", "B", 7, "DPS", "/images/ranger.jpg", "Master of ranged combat");
            Character ch6 = new Character("6", "Priest", "B", 6, "Support", "/images/priest.jpg", "Bearer of restoration");
            Character ch7 = new Character("7", "Druid", "A", 8, "Hybrid", "/images/druid.jpg", "Nature's guardian");

            characterRepository.saveAll(Arrays.asList(ch1, ch2, ch3, ch4, ch5, ch6, ch7));
        }
    }
}

