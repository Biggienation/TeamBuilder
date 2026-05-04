package teambuilder.service;

import teambuilder.model.BasicCharacterModel;
import teambuilder.model.FullCharacterModel;
import teambuilder.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public List<FullCharacterModel> getAllCharacters() {
        return characterRepository.findAll();
    }

    public List<BasicCharacterModel> getAllBasicCharacters() {
        return getAllCharacters().stream()
                .map(character -> new BasicCharacterModel(character.getName(), character.getElement(), character.getImageUrl()))
                .toList();
    }

    public Optional<FullCharacterModel> getCharacterById(String id) {
        return characterRepository.findById(id);
    }

    public FullCharacterModel createCharacter(FullCharacterModel fullCharacterModel) {
        return characterRepository.save(fullCharacterModel);
    }

    public FullCharacterModel updateCharacter(FullCharacterModel fullCharacterModel) {
        return characterRepository.save(fullCharacterModel);
    }

    public void deleteCharacter(String id) {
        characterRepository.deleteById(id);
    }

    public List<FullCharacterModel> findByTier(String tier) {
        return characterRepository.findByTier(tier);
    }

    public List<FullCharacterModel> findByRole(String role) {
        return characterRepository.findByRole(role);
    }

    public List<FullCharacterModel> findFullCharacterByName(String name) {
        return characterRepository.findByName(name);
    }

    public BasicCharacterModel findBasicCharacterByName(String name) {
        var ch = findFullCharacterByName(name).stream().findFirst();
        if (ch.isEmpty()) {
            throw new IllegalArgumentException("Character not found: " + name);
        }
        return new BasicCharacterModel(ch.get().getName(), ch.get().getElement(), ch.get().getImageUrl());
    }

    public List<FullCharacterModel> findByElement(String element) {
        return characterRepository.findByElement(element);
    }

    public List<FullCharacterModel> findByRarity(String rarity) {
        return characterRepository.findByRarity(rarity);
    }
}
