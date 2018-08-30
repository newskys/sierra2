package sierra2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sierra2.document.Document;
import sierra2.document.DocumentRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/docs")
public class DocumentController {
    @Autowired
    DocumentRepository documentRepository;

    @PostMapping("/save")
    ResponseEntity<String> save(HttpServletRequest request, @RequestBody Map<String, String> payload) {
        if (payload == null || payload.isEmpty()) {
            return new ResponseEntity<>("정보가 부족합니다", HttpStatus.BAD_REQUEST);
        }

        String userId = payload.get("userId");
        String contents = payload.get("contents");

        if (StringUtils.isEmpty(userId) ||StringUtils.isEmpty(contents)) {
            return new ResponseEntity<>("정보가 부족합니다", HttpStatus.BAD_REQUEST);
        }

        Document document = new Document();
        document.setUserId(userId);
        document.setContents(contents);
        Date now = new Date();
        document.setCreateDate(now);
        document.setUpdateDate(now);
        Document save = documentRepository.save(document);
        String response = save.toString();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping("/read")
    ResponseEntity<List<Document>> read(String userId) {
//        Optional<Document> document = documentRepository.findById(1);
        List<Document> all = documentRepository.findAll();

        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
