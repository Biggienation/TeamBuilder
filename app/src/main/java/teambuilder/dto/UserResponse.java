package teambuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String profileIcon;
    private List<String> ownedCharacters;
    private String memoryOfChaos;
    private String pureFiction;
    private String apocalypticShadow;
    private String anomalyArbitraton;
    private boolean active;
}
