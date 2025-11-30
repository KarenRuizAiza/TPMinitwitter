package unrn.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unrn.model.User;
import unrn.repository.UserRepository;
import unrn.dto.UserDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDTO createUser(String name, String userName) {
        // Regla de negocio: No se pueden agregar dos usuarios con el mismo userName.
        Optional<User> existingUser = userRepository.findByUserName(userName);
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with username '" + userName + "' already exists.");
        }
        // La validación de la longitud del nombre de usuario se hace en el constructor de User.
        User newUser = new User(name, userName);
        User savedUser = userRepository.save(newUser);
        return toDTO(savedUser);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    private UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getUserName());
    }
}
