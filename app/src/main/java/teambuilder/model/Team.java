package teambuilder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    private String id;
    private String name;
    private String description;
    private Character character1;
    private Character character2;
    private Character character3;
    private Character character4;
}
