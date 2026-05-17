package teambuilder.controller;

import teambuilder.model.BasicCharacterModel;
import teambuilder.model.FullCharacterModel;
import teambuilder.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "*")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @GetMapping
    public ResponseEntity<List<FullCharacterModel>> getAllCharacters() {
        List<FullCharacterModel> fullCharacterModels = characterService.getAllCharacters();
        return ResponseEntity.ok(fullCharacterModels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FullCharacterModel> getCharacterById(@PathVariable String id) {
        return characterService.getCharacterById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FullCharacterModel> createCharacter(@RequestBody FullCharacterModel fullCharacterModel) {
        FullCharacterModel created = characterService.createCharacter(fullCharacterModel);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FullCharacterModel> updateCharacter(@PathVariable String id, @RequestBody FullCharacterModel fullCharacterModel) {
        FullCharacterModel updated = characterService.updateCharacter(fullCharacterModel);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tier/{tier}")
    public ResponseEntity<List<FullCharacterModel>> getCharactersByTier(@PathVariable String tier) {
        List<FullCharacterModel> fullCharacterModels = characterService.findByTier(tier);
        return ResponseEntity.ok(fullCharacterModels);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<FullCharacterModel>> getCharactersByRole(@PathVariable String role) {
        List<FullCharacterModel> fullCharacterModels = characterService.findByRole(role);
        return ResponseEntity.ok(fullCharacterModels);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<FullCharacterModel>> searchCharactersByName(@PathVariable String name) {
        List<FullCharacterModel> fullCharacterModels = characterService.findFullCharacterByName(name);
        return ResponseEntity.ok(fullCharacterModels);
    }

    @GetMapping("/element/{element}")
    public ResponseEntity<List<FullCharacterModel>> getCharactersByElement(@PathVariable String element) {
        List<FullCharacterModel> fullCharacterModels = characterService.findByElement(element);
        return ResponseEntity.ok(fullCharacterModels);
}

    @GetMapping("/rarity/{rarity}")
    public ResponseEntity<List<FullCharacterModel>> getCharactersByRarity(@PathVariable String rarity) {
        List<FullCharacterModel> fullCharacterModels = characterService.findByRarity(rarity);
        return ResponseEntity.ok(fullCharacterModels);
    }

    @GetMapping("/basic")
    public ResponseEntity<List<BasicCharacterModel>> getAllBasicCharacters() {
        List<BasicCharacterModel> BasicCharacterModels = characterService.getAllBasicCharacters();
        return ResponseEntity.ok(BasicCharacterModels);
    }

     
}
