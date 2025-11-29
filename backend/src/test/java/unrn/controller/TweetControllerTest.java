package unrn.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import unrn.model.Tweet;
import unrn.model.User;
import unrn.repository.TweetRepository;
import unrn.repository.UserRepository;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class TweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TweetRepository tweetRepository;

    @Test
    public void whenPostTweet_thenTweetIsCreated() throws Exception {
        // given
        User author = userRepository.save(new User("author"));
        var request = new TweetController.CreateTweetRequest(author.getId(), "A valid tweet text.");

        // when & then
        mockMvc.perform(post("/tweets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.text", is("A valid tweet text.")))
                .andExpect(jsonPath("$.author.id", is(author.getId().intValue())));
    }

    @Test
    public void whenPostRetweet_thenRetweetIsCreated() throws Exception {
        // given
        User originalAuthor = userRepository.save(new User("originalAuthor"));
        User retweeter = userRepository.save(new User("retweeter"));
        Tweet originalTweet = tweetRepository.save(new Tweet("Original tweet.", originalAuthor, null));

        var request = new TweetController.CreateRetweetRequest(retweeter.getId(), originalTweet.getId());

        // when & then
        mockMvc.perform(post("/tweets/retweet")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.author.id", is(retweeter.getId().intValue())))
                .andExpect(jsonPath("$.originalTweetId", is(originalTweet.getId().intValue())));
    }

    @Test
    public void whenPostRetweetOwnTweet_thenBadRequest() throws Exception {
        // given
        User author = userRepository.save(new User("self_retweeter"));
        Tweet originalTweet = tweetRepository.save(new Tweet("My own tweet.", author, null));
        var request = new TweetController.CreateRetweetRequest(author.getId(), originalTweet.getId());

        // when & then
        mockMvc.perform(post("/tweets/retweet")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}

