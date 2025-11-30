package unrn.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unrn.dto.TweetDTO;
import unrn.dto.UserDTO;
import unrn.model.Tweet;
import unrn.model.User;
import unrn.repository.TweetRepository;
import unrn.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TweetService {

    private final UserRepository userRepository;
    private final TweetRepository tweetRepository;

    public TweetService(UserRepository userRepository, TweetRepository tweetRepository) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
    }

    @Transactional
    public TweetDTO createTweet(Long authorId, String text) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + authorId));

        author.addTweet(text);
        userRepository.save(author);

        Tweet newTweet = author.getTweets().get(author.getTweets().size() - 1);
        return toDTO(newTweet);
    }

    @Transactional
    public TweetDTO createRetweet(Long retweeterId, Long originalTweetId) {
        User retweeter = userRepository.findById(retweeterId)
                .orElseThrow(() -> new RuntimeException("Retweeter user not found with id: " + retweeterId));

        Tweet originalTweet = tweetRepository.findById(originalTweetId)
                .orElseThrow(() -> new RuntimeException("Original tweet not found with id: " + originalTweetId));

        retweeter.addRetweet(originalTweet);
        userRepository.save(retweeter);

        Tweet newRetweet = retweeter.getTweets().get(retweeter.getTweets().size() - 1);
        return toDTO(newRetweet);
    }

    @Transactional(readOnly = true)
    public List<TweetDTO> findAll(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Tweet> tweetPage = tweetRepository.findByOriginalTweetIsNullOrderByCreationDateDesc(pageable);
        return tweetPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TweetDTO> findByAuthorId(Long authorId, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Tweet> tweetPage = tweetRepository.findByAuthorIdOrderByCreationDateDesc(authorId, pageable);
        return tweetPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getUserName());
    }

    private TweetDTO toDTO(Tweet tweet) {
        UserDTO authorDTO = toDTO(tweet.getAuthor());
        Long originalTweetId = tweet.getOriginalTweet() != null ? tweet.getOriginalTweet().getId() : null;
        String originalTweetText = tweet.getOriginalTweet() != null ? tweet.getOriginalTweet().getText() : null;
        UserDTO originalAuthorDTO = tweet.getOriginalTweet() != null ? toDTO(tweet.getOriginalTweet().getAuthor())
                : null;

        return new TweetDTO(tweet.getId(), tweet.getText(), authorDTO,
                originalTweetId, originalAuthorDTO != null ? originalAuthorDTO.userName() : null,
                originalTweetText,
                tweet.getCreationDate());
    }
}
