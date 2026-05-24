package teambuilder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "memoryOfChaos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemoryOfChaos {
    @Id
    private String id;
    private String name;
    private String description;
    private String character1;
    private String character2;
    private String character3;
    private String character4;
    private int score;
}
