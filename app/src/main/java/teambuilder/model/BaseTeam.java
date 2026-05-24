package teambuilder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseTeam {
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
