package teambuilder.repository;

import teambuilder.model.Character;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends MongoRepository<Character, String> {
    List<Character> findByName(String name);
    List<Character> findByTier(String tier);
    List<Character> findByElement(String element);
    List<Character> findByRarity(String rarity);
    List<Character> findByRole(String role);
}
