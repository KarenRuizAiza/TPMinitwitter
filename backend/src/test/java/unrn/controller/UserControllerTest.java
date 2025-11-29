package unrn.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import unrn.model.User;
import unrn.repository.UserRepository;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // Para asegurar que cada test se ejecute en su propia transacción y se revierta al final
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void whenPostUser_thenUserIsCreated() throws Exception {
        // given
        var createUserRequest = new UserController.CreateUserRequest("testuser");

        // when & then
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.username", is("testuser")));
    }

    @Test
    public void whenPostDuplicateUser_thenBadRequest() throws Exception {
        // given
        // Primero creamos un usuario en la BD
        userRepository.save(new User("existinguser"));

        var createUserRequest = new UserController.CreateUserRequest("existinguser");

        // when & then
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenPostUserWithInvalidUsername_thenBadRequest() throws Exception {
        // El nombre es muy corto, la validación del modelo debería fallar
        var createUserRequest = new UserController.CreateUserRequest("abc");

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isBadRequest());
    }
}
