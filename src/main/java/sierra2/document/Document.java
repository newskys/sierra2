package sierra2.document;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@org.springframework.data.mongodb.core.mapping.Document(collection = "document")
public class Document {

    @Indexed
    private String userId;

    @Indexed
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date updateDate;

    private int status;

    private String title;

    private String contents;
}
