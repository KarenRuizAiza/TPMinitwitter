package unrn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unrn.model.Tweet;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
    Page<Tweet> findByOriginalTweetIsNullOrderByCreationDateDesc(Pageable pageable);
    Page<Tweet> findByAuthorIdOrderByCreationDateDesc(Long authorId, Pageable pageable);
}
