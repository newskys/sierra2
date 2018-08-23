package sierra2.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;

@Data
@org.springframework.data.mongodb.core.mapping.Document(collection = "document")
public class Document {

    @Id
    private int id;

    @Indexed(unique = true)
    private String userId;

    private Date createDate;

    private Date updateDate;

    private int status;

    private String contents;
}
