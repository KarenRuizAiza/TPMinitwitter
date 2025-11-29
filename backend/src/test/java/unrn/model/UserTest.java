package unrn.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    @DisplayName("Crear usuario con nombre válido")
    void crearUsuario_nombreValido() {
        // Setup
        String userName = "UsuarioValido";

        // Ejercitación
        User user = new User(userName);

        // Verificación
        assertEquals(userName, user.getUserName(), "El nombre de usuario no coincide con el esperado");
        assertTrue(user.getTweets().isEmpty(), "El usuario recién creado debe tener la lista de tweets vacía");
    }

    @Test
    @DisplayName("Crear usuario con nombre inválido lanza excepción")
    void crearUsuario_nombreInvalido() {
        // Ejercitación y Verificación
        var ex = assertThrows(RuntimeException.class, () -> new User("abc"));
        assertEquals(User.ERROR_NOMBRE_CORTO, ex.getMessage());
    }

    @Test
    @DisplayName("Agregar un tweet original")
    void agregarTweetOriginal() {
        // Setup
        User user = new User("UsuarioValido");

        // Ejercitación
        user.addTweet("Este es un tweet original");

        // Verificación
        List<Tweet> tweets = user.getTweets();
        assertEquals(1, tweets.size(), "Debe haber un tweet en la lista");
        assertEquals("Este es un tweet original", tweets.get(0).getText(), "El texto del tweet no coincide");
    }

    @Test
    @DisplayName("Agregar un retweet")
    void agregarRetweet() {
        // Setup
        User user1 = new User("Usuario1");
        User user2 = new User("Usuario2");
        Tweet originalTweet = new Tweet("Tweet original", user1, null);

        // Ejercitación
        user2.addRetweet(originalTweet);

        // Verificación
        List<Tweet> tweets = user2.getTweets();
        assertEquals(1, tweets.size(), "Debe haber un tweet en la lista");
        assertEquals(originalTweet, tweets.get(0).getOriginalTweet(), "El retweet no referencia correctamente al tweet original");
    }

    @Test
    @DisplayName("Eliminar todos los tweets del usuario")
    void eliminarTweetsUsuario() {
        // Setup
        User user = new User("UsuarioValido");
        user.addTweet("Tweet 1");
        user.addTweet("Tweet 2");

        // Ejercitación
        user.deleteUserTweets();

        // Verificación
        assertTrue(user.getTweets().isEmpty(), "La lista de tweets debe estar vacía después de eliminar los tweets");
    }
}

