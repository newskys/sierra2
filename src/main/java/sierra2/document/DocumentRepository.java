package sierra2.document;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DocumentRepository extends MongoRepository<Document, Integer> {
    List<Document> findByUserId(String userId);
//    @Query(value = "SELECT * FROM document d WHERE d.user_id = :userId", nativeQuery = true)
//    List<Document> selectByUserId(@Param("userId") String userId);
}
