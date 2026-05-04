package teambuilder.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CharacterTeamModel {
    private String id;
    private String name;
    private String description;
    private BasicCharacterModel character1;
    private BasicCharacterModel character2;
    private BasicCharacterModel character3;
    private BasicCharacterModel character4;
}
