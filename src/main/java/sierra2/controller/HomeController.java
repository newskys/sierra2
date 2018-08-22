package sierra2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sierra2.member.Member;
import sierra2.member.MemberRepository;
import sierra2.security.JwtService;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class HomeController {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/test")
    public ResponseEntity<Member> test() {
        Member member = memberRepository.selectByUserId("newskys");
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(String id, HttpServletResponse response) {
        Member member = memberRepository.selectByUserId(id);

        if (member == null || StringUtils.isEmpty(member.getId())) {
            return new ResponseEntity<>("bad", HttpStatus.BAD_REQUEST);
        }

        String token = jwtService.create(member.getUserId(), member, "member");
        response.setHeader("Authorization", token);

        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
