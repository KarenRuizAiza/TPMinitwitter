package unrn.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {
    static final String ERROR_NOMBRE_LARGO = "El nombre de usuario no debe tener más de 25 caracteres";
    static final String ERROR_NOMBRE_CORTO = "El nombre de usuario debe tener al menos 5 caracteres";
    static final String ERROR_NOMBRE_NULO = "El nombre de usuario no puede ser nulo ni vacío";
    static final String ERROR_NOMBRE_VACIO = "El nombre de usuario no puede ser nulo ni vacío";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false, length = 25)
    private String userName;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Tweet> tweets;

    protected User() {
    }

    public User(String name, String userName) {
        assertNombreCorto(userName);
        assertNombreLargo(userName);

        this.name = name;
        this.userName = userName;
        this.tweets = new ArrayList<>();
    }

    private void assertNombreLargo(String nombre) {
        if (nombre.length() > 25) {
            throw new RuntimeException(ERROR_NOMBRE_LARGO);
        }
    }

    private void assertNombreCorto(String nombre) {
        if (nombre.length() < 5) {
            throw new RuntimeException(ERROR_NOMBRE_CORTO);
        }
    }
    private void assertNombreNoNuloNiVacio(String nombre) {
        if (nombre == null) {
            throw new RuntimeException(ERROR_NOMBRE_NULO);
        }
    }

    private void assertNombreVacio(String nombre){
        if (nombre.isEmpty()){
            throw new RuntimeException(ERROR_NOMBRE_VACIO);
        }
    }

    public void addTweet(String text) {
        tweets.add(new Tweet(text, this, null));
    }

    public void addRetweet(Tweet originalTweet) {
        tweets.add(new Tweet("", this, originalTweet));
    }



    public void deleteUserTweets() {
        tweets.clear();
    }

    public List<Tweet> getTweets() {
        return List.copyOf(tweets);
    }

    public String getName() {
        return name;
    }

    public String getUserName() {
        return userName;
    }

    public Long getId() {
        return id;
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