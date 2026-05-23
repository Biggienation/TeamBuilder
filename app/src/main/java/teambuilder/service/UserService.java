package teambuilder.service;

import teambuilder.model.User;
import teambuilder.repository.UserRepository;
import teambuilder.dto.UserRegistrationRequest;
import teambuilder.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Register a new user
     */
    public UserResponse registerUser(UserRegistrationRequest request) throws Exception {
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new Exception("Username already exists");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new Exception("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);
        return convertToResponse(savedUser);
    }

    /**
     * Authenticate user and return user info if credentials are valid
     */
    public UserResponse authenticateUser(String username, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();

        if (!user.isActive()) {
            throw new Exception("User account is inactive");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }

        return convertToResponse(user);
    }

    /**
     * Get user by ID
     */
    public UserResponse getUserById(String id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        return convertToResponse(user.get());
    }

    /**
     * Get user by username
     */
    public UserResponse getUserByUsername(String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        return convertToResponse(user.get());
    }

    /**
     * Update user profile
     */
    public UserResponse updateUser(String id, UserRegistrationRequest request) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();

        // Only update email if it's different and doesn't already exist
        if (!user.getEmail().equals(request.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new Exception("Email already exists");
            }
            user.setEmail(request.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }

    /**
     * Delete user
     */
    public void deleteUser(String id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }
        userRepository.deleteById(id);
    }

    /**
     * Get all users
     */
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Save user's owned characters
     */
    public UserResponse saveOwnedCharacters(String id, List<String> characterNames) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();
        user.setOwnedCharacters(characterNames);
        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }

    public UserResponse updateProfileIcon(String userId, String profileIcon) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        user.setProfileIcon(profileIcon);
        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }


    /**
     * Convert User entity to UserResponse DTO
     */
    private UserResponse convertToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getOwnedCharacters(),
                user.isActive()
        );
    }

}
