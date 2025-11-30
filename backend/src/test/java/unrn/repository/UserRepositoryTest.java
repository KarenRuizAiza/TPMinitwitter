package unrn.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import unrn.model.Tweet;
import unrn.model.User;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TweetRepository tweetRepository;

    @Test
    public void whenFindByUserName_thenReturnUser() {
        // given
        User user = new User("testuser", "testuser");
        entityManager.persist(user);
        entityManager.flush();

        // when
        Optional<User> found = userRepository.findByUserName(user.getUserName());

        // then
        assertThat(found.isPresent()).isTrue();
        assertThat(found.get().getUserName()).isEqualTo(user.getUserName());
    }

    @Test
    public void whenUserIsDeleted_thenTweetsAreAlsoDeleted() {
        // given
        User user = new User("userwithtweets", "userwithtweets");
        user.addTweet("My first tweet!");
        entityManager.persist(user);
        entityManager.flush();

        // Verify tweet was also saved due to cascade
        Tweet savedTweet = tweetRepository.findAll().get(0);
        assertThat(savedTweet).isNotNull();
        assertThat(savedTweet.getAuthor()).isEqualTo(user);
        Long userId = user.getId();
        Long tweetId = savedTweet.getId();


        // when
        userRepository.deleteById(userId);
        entityManager.flush();

        // then
        Optional<User> deletedUser = userRepository.findById(userId);
        Optional<Tweet> deletedTweet = tweetRepository.findById(tweetId);

        assertThat(deletedUser.isEmpty()).isTrue();
        assertThat(deletedTweet.isEmpty()).isTrue();
    }
    
    @Test
    public void whenFindByNonExistentUserName_thenReturnEmpty() {
        // when
        Optional<User> found = userRepository.findByUserName("nonexistent");

        // then
        assertThat(found.isEmpty()).isTrue();
    }
}