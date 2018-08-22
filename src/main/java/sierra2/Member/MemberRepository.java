package sierra2.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query(value = "SELECT * FROM member m WHERE m.user_id = :userId", nativeQuery = true)
    Member selectByUserId(@Param("userId") String userId);

    @Query(value = "SELECT * FROM member m WHERE m.email = :email", nativeQuery = true)
    Member selectByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM member m WHERE m.user_id = :userId", nativeQuery = true)
    int deleteByUserId(@Param("userId") String userId);
}
