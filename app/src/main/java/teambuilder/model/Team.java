package teambuilder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Team {
    private String id;
    private String name;
    private ArrayList<String> categories;
    private String description;
    private String character1;
    private String character2;
    private String character3;
    private String character4;
}
