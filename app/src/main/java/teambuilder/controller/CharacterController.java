package teambuilder.controller;

import teambuilder.model.Character;
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
    public ResponseEntity<List<Character>> getAllCharacters() {
        List<Character> characters = characterService.getAllCharacters();
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getCharacterById(@PathVariable String id) {
        return characterService.getCharacterById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Character> createCharacter(@RequestBody Character character) {
        Character created = characterService.createCharacter(character);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Character> updateCharacter(@PathVariable String id, @RequestBody Character character) {
        Character updated = characterService.updateCharacter(id, character);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tier/{tier}")
    public ResponseEntity<List<Character>> getCharactersByTier(@PathVariable String tier) {
        List<Character> characters = characterService.findByTier(tier);
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<Character>> getCharactersByRole(@PathVariable String role) {
        List<Character> characters = characterService.findByRole(role);
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Character>> searchCharactersByName(@PathVariable String name) {
        List<Character> characters = characterService.findByName(name);
        return ResponseEntity.ok(characters);
    }
}

