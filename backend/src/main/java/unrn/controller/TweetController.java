package unrn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unrn.dto.TweetDTO;
import unrn.service.TweetService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tweets")
@CrossOrigin(origins = "http://localhost:5173")
public class TweetController {

    private final TweetService tweetService;

    public TweetController(TweetService tweetService) {
        this.tweetService = tweetService;
    }

    // DTOs para los requests
    public record CreateTweetRequest(Long authorId, String text) {}
    public record CreateRetweetRequest(Long retweeterId, Long originalTweetId) {}

    @PostMapping
    public ResponseEntity<TweetDTO> postTweet(@RequestBody CreateTweetRequest request) {
        try {
            TweetDTO createdTweet = tweetService.createTweet(request.authorId(), request.text());
            return new ResponseEntity<>(createdTweet, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/retweet")
    public ResponseEntity<TweetDTO> postRetweet(@RequestBody CreateRetweetRequest request) {
        try {
            TweetDTO createdRetweet = tweetService.createRetweet(request.retweeterId(), request.originalTweetId());
            return new ResponseEntity<>(createdRetweet, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<TweetDTO>> getAllTweets(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size) {
        return ResponseEntity.ok(tweetService.findAll(page.orElse(0), size.orElse(10)));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<TweetDTO>> getTweetsByUser(
            @PathVariable Long id,
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size) {
        return ResponseEntity.ok(tweetService.findByAuthorId(id, page.orElse(0), size.orElse(15)));
    }
}
