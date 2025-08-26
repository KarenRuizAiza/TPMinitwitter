package unrn.model;

import java.util.Objects;

public class Tweet {
    private final String text; // Si el tweet es un re-tweet, este campo puede estar vacío
    private final Tweet originalTweet; // Si es un re-tweet, referencia al tweet original
    private final User author; // Autor del tweet

    public Tweet(String text, User author, Tweet originalTweet) {
        assertValidText(text);
        assertValidRetweet(author, originalTweet);

        this.text = text;
        this.author = Objects.requireNonNull(author, "Author cannot be null.");
        this.originalTweet = originalTweet;
    }

    //
    private void assertValidText(String text) {
        if (text == null || text.length() < 1 || text.length() > 280) {
            throw new RuntimeException(ERROR_INVALID_TWEET_TEXT);
        }
    }

    //
    private void assertValidRetweet(User author, Tweet originalTweet) {
        if (originalTweet != null && originalTweet.getAuthor().equals(author)) {
            throw new RuntimeException(ERROR_INVALID_RETWEET);
        }
    }

    private User getAuthor() {
        return this.author;
    }

    public String text() {

        return text;
    }

    public Tweet originalTweet() {

        return originalTweet;
    }

    public User author() {

        return author;
    }

    static final String ERROR_INVALID_TWEET_TEXT = "Tweet text must be between 1 and 280 characters.";
    static final String ERROR_INVALID_RETWEET = "Cannot retweet a tweet created by the same user.";
}
