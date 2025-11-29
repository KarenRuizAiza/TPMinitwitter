package unrn.dto;

public record TweetDTO(Long id, String text, UserDTO author, Long originalTweetId, String originalAuthorUsername) {
}
