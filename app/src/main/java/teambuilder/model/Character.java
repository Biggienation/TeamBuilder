package teambuilder.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "characters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Character {

    @Id
    private String id;
    private String name;
    private String tier;
    private String rarity;
    private String element;
    private String path;
    private String role;
    private String imageUrl;
    private String description;
    
}
