package unrn.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TweetTest {

    @Test
    @DisplayName("Crear un tweet original con texto válido")
    void crearTweetOriginal_textoValido() {
        // Setup
        User user = new User("UsuarioValido");

        // Ejercitación
        Tweet tweet = new Tweet("Texto válido", user, null);

        // Verificación
        assertEquals("Texto válido", tweet.text(), "El texto del tweet no coincide con el esperado");
        assertNull(tweet.originalTweet(), "El tweet original debe ser null para un tweet original");
        assertEquals(user, tweet.author(), "El autor del tweet no coincide con el esperado");
    }

    @Test
    @DisplayName("Crear un tweet con texto inválido lanza excepción")
    void crearTweet_textoInvalido() {
        // Setup
        User user = new User("UsuarioValido");

        // Ejercitación y Verificación
        var ex = assertThrows(RuntimeException.class, () -> new Tweet("", user, null));
        assertEquals(Tweet.ERROR_INVALID_TWEET_TEXT, ex.getMessage());
    }

    @Test
    @DisplayName("Crear un retweet válido")
    void crearRetweet_valido() {
        // Setup
        User user1 = new User("Usuario1");
        User user2 = new User("Usuario2");
        Tweet originalTweet = new Tweet("Tweet original", user1, null);

        // Ejercitación
        Tweet retweet = new Tweet("", user2, originalTweet);

        // Verificación
        assertEquals("", retweet.text(), "El texto del retweet debe estar vacío");
        assertEquals(originalTweet, retweet.originalTweet(), "El retweet no referencia correctamente al tweet original");
        assertEquals(user2, retweet.author(), "El autor del retweet no coincide con el esperado");
    }

    @Test
    @DisplayName("Crear un retweet del mismo usuario lanza excepción")
    void crearRetweet_mismoUsuarioLanzaExcepcion() {
        // Setup
        User user = new User("UsuarioValido");
        Tweet originalTweet = new Tweet("Tweet original", user, null);

        // Ejercitación y Verificación
        var ex = assertThrows(RuntimeException.class, () -> new Tweet("", user, originalTweet));
        assertEquals(Tweet.ERROR_INVALID_RETWEET, ex.getMessage());
    }
}
