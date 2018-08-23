package sierra2.member;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberRepository extends MongoRepository<Member, Integer> {
    public Member findByUserId(String userId);
    public int deleteByUserId(String userId);
//    @Query(value = "SELECT * FROM member m WHERE m.user_id = :userId", nativeQuery = true)
//    Member selectByUserId(@Param("userId") String userId);
//
//    @Query(value = "SELECT * FROM member m WHERE m.email = :email", nativeQuery = true)
//    Member selectByEmail(@Param("email") String email);
//
//    @Modifying
//    @Transactional
//    @Query(value = "DELETE FROM member m WHERE m.user_id = :userId", nativeQuery = true)
//    int deleteByUserId(@Param("userId") String userId);
}
