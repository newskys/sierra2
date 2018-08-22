package sierra2.document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    @Query(value = "SELECT * FROM document d WHERE d.user_id = :userId", nativeQuery = true)
    List<Document> selectByUserId(@Param("userId") String userId);
}
