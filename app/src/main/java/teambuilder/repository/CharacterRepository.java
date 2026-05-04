package teambuilder.repository;

import teambuilder.model.FullCharacterModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends MongoRepository<FullCharacterModel, String> {
    List<FullCharacterModel> findByName(String name);
    List<FullCharacterModel> findByTier(String tier);
    List<FullCharacterModel> findByElement(String element);
    List<FullCharacterModel> findByRarity(String rarity);
    List<FullCharacterModel> findByRole(String role);
}
