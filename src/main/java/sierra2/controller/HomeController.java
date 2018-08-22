package sierra2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sierra2.Member.Member;
import sierra2.Member.MemberRepository;

@RestController
@RequestMapping("/api")
public class HomeController {
    @Autowired
    MemberRepository memberRepository;

    @GetMapping("/test")
    public ResponseEntity<Member> test() {
        Member member = memberRepository.selectByUserId("newskys");
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
