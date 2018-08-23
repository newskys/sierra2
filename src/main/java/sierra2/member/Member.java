package sierra2.member;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

@Data
@Document(collection = "member")
public class Member implements Serializable {
    private static final long serialVersionUID = -462000190800958491L;

    @Id
    private int id;

    @Indexed(unique = true)
    private String userId;

    private String password;

    private Date createDate;

    private Date updateDate;

    private int roleType;

    private String email;
}
