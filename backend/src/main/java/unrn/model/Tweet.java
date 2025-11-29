package unrn.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class Tweet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 280)
    private String text;

    @ManyToOne
    @JoinColumn(name = "original_tweet_id")
    private Tweet originalTweet;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    @JsonBackReference
    private User author;

    protected Tweet() {
    }

    public Tweet(String text, User author, Tweet originalTweet) {
        assertValidText(text, originalTweet);
        assertValidRetweet(author, originalTweet);

        this.text = text;
        this.author = Objects.requireNonNull(author, "Author cannot be null.");
        this.originalTweet = originalTweet;
    }

    private void assertValidText(String text, Tweet originalTweet) {
        boolean isRetweet = originalTweet != null;
        if (!isRetweet && (text == null || text.length() < 1 || text.length() > 280)) {
            throw new RuntimeException(ERROR_INVALID_TWEET_TEXT);
        }
        if (isRetweet && (text != null && !text.isEmpty())) {
            // En un retweet, el texto debe estar vacío. El constructor de User lo llama con "".
            // Esta validación asegura que no se pueda crear un retweet con texto adicional.
            if (!text.isEmpty()) {
                throw new RuntimeException("Retweets cannot have additional text.");
            }
        }
    }

    private void assertValidRetweet(User author, Tweet originalTweet) {
        if (originalTweet != null && originalTweet.getAuthor().equals(author)) {
            throw new RuntimeException(ERROR_INVALID_RETWEET);
        }
    }

    public User getAuthor() {
        return this.author;
    }

    public String getText() {
        return text;
    }

    public Tweet getOriginalTweet() {
        return originalTweet;
    }

    public Long getId() {
        return id;
    }

    static final String ERROR_INVALID_TWEET_TEXT = "Tweet text must be between 1 and 280 characters.";
    static final String ERROR_INVALID_RETWEET = "Cannot retweet a tweet created by the same user.";
}

