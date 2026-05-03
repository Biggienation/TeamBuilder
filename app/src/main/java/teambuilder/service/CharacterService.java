package teambuilder.service;

import teambuilder.model.Character;
import teambuilder.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Optional<Character> getCharacterById(String id) {
        return characterRepository.findById(id);
    }

    public Character createCharacter(Character character) {
        return characterRepository.save(character);
    }

    public Character updateCharacter(Character character) {
        return characterRepository.save(character);
    }

    public void deleteCharacter(String id) {
        characterRepository.deleteById(id);
    }

    public List<Character> findByTier(String tier) {
        return characterRepository.findByTier(tier);
    }

    public List<Character> findByRole(String role) {
        return characterRepository.findByRole(role);
    }

    public List<Character> findByName(String name) {
        return characterRepository.findByName(name);
    }

    public List<Character> findByElement(String element) {
        return characterRepository.findByElement(element);
    }

    public List<Character> findByRarity(String rarity) {
        return characterRepository.findByRarity(rarity);
    }
}
