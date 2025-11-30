package unrn.dto;

import java.time.LocalDateTime;

public record TweetDTO(Long id, String text, UserDTO author, Long originalTweetId, String originalAuthorUsername, String originalTweetText, LocalDateTime creationDate) {
}
