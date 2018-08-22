package sierra2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sierra2.document.Document;
import sierra2.document.DocumentRepository;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/docs")
public class DocumentController {
    @Autowired
    DocumentRepository documentRepository;

    @RequestMapping("/save")
    ResponseEntity<String> save(String userId, String contents) {
        Document document = new Document();
        document.setUserId(userId);
        document.setContents(contents);
        Document save = documentRepository.save(document);
        String response = save.toString();
        return new ResponseEntity<String>(response, HttpStatus.OK);
    }

    @RequestMapping("/read")
    ResponseEntity<List<Document>> read(String userId) {
//        Optional<Document> document = documentRepository.findById(1);
        List<Document> all = documentRepository.findAll();

        return new ResponseEntity<List<Document>>(all, HttpStatus.OK);
    }
}
