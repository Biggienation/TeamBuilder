package teambuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teambuilder.model.BasicCharacterModel;
import teambuilder.repository.CharacterRepository;
import teambuilder.repository.TeamRepository;
import teambuilder.repository.UserRepository;
import teambuilder.util.ItemRecommender;

import java.util.*;

@Service
public class RecommendationService {
    @Autowired
    CharacterRepository characterRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;


    public List<BasicCharacterModel> getRecommendedCharacters(String id) {
        var user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found: " + id));


        Set<String> ownedCharacters = new HashSet<>(user.getOwnedCharacters());

        if (ownedCharacters.isEmpty()) {
            throw new IllegalArgumentException("No ownedCharacters found for user: " + id);
        }

        var teams = teamRepository.findAll()
                .stream()
                .map(team -> Set.of(
                        team.getCharacter1(),
                        team.getCharacter2(),
                        team.getCharacter3(),
                        team.getCharacter4())).toList();


        var recommendations = ItemRecommender.recommend(ownedCharacters, teams);


        return recommendations.stream()
                .map(character -> characterRepository.findByName(character.getKey()).stream().findFirst().orElseThrow(() -> new IllegalArgumentException("Character not found: " + character.getKey())))
                .map(character -> new BasicCharacterModel(character.getName(), character.getElement(), character.getImageUrl()))
                .toList();
    }
}
