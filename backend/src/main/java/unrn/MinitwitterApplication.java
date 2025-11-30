package unrn;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import unrn.model.User;
import unrn.repository.UserRepository;
import unrn.service.TweetService;

import java.util.stream.IntStream;

@SpringBootApplication
public class MinitwitterApplication {

    public static void main(String[] args) {
        SpringApplication.run(MinitwitterApplication.class, args);
    }

    @Bean
    @Profile("!test")
    public CommandLineRunner initData(UserRepository userRepository, TweetService tweetService) {
        return args -> {
            User user1 = userRepository.save(new User("John Doe", "johndoe"));
            User user2 = userRepository.save(new User("Jane Smith", "janesmith"));

            IntStream.range(0, 15).forEach(i -> {
                tweetService.createTweet(user1.getId(), "This is tweet number " + i + " from John Doe");
                tweetService.createTweet(user2.getId(), "This is tweet number " + i + " from Jane Smith");
            });
        };
    }
}
