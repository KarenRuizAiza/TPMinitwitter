package unrn.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class User {
    static final String ERROR_NOMBRE_LARGO = "El nombre no debe tener más de 25 caracteres";
    static final String ERROR_NOMBRE_CORTO = "El nombre debe tener al menos 5 caracteres";
    static final String ERROR_NOMBRE_NULO = "El nombre no puede ser nulo ni vacío";

    static final String ERROR_NOMBRE_VACIO = "El nombre no puede ser nulo ni vacío";

    private final String userName;
    private final List<Tweet> tweets; // List of tweets by the user

    public User(String userName) {
        assertNombreCorto(userName);
        assertNombreLargo(userName);

        this.userName = userName;
        this.tweets = new ArrayList<>();
    }

    // Validación el nombre de usuario no debe ser mayor a 25, lanzando una excepción si no lo es
    private void assertNombreLargo(String nombre) {
        if (nombre.length() > 25) {
            throw new RuntimeException(ERROR_NOMBRE_LARGO);
        }
    }

    // Validación el nombre de usuario no debe ser menor a 5, lanzando una excepción si no lo es
    private void assertNombreCorto(String nombre) {
        if (nombre.length() < 5) {
            throw new RuntimeException(ERROR_NOMBRE_CORTO);
        }
    }
    // Validación para que el nombre de usuario no sea nulo ni vacío
    private void assertNombreNoNuloNiVacio(String nombre) {
        if (nombre == null) {
            throw new RuntimeException(ERROR_NOMBRE_NULO);
        }
    }

    private void assertNombreVacio(String nombre){
        if (nombre.isEmpty()){
            throw new RuntimeException(ERROR_NOMBRE_VACIO)
        }
    }

    // Agrega un tweet original
    public void addTweet(String text) {

        tweets.add(new Tweet(text, this, null));
    }

    // Agrega un retweet
    public void addRetweet(Tweet originalTweet) {
        tweets.add(new Tweet("", this, originalTweet));
    }

    // Elimina todos los tweets del usuario
    public void deleteUserTweets() {
        tweets.clear(); // Deletes all tweets by the user
    }


    public List<Tweet> tweets() {
        return List.copyOf(tweets); // Returns an unmodifiable view of the tweets
    }

    public String userName() {
        return userName;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        User user = (User) obj;
        return userName.equals(user.userName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName);
    }

}