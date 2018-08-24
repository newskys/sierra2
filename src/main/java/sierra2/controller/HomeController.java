package sierra2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sierra2.member.Member;
import sierra2.member.MemberRepository;
import sierra2.security.JwtService;

import javax.servlet.http.HttpServletRequest;
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
        Member member = memberRepository.findByUserId("newskys");
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest request, HttpServletResponse response) {
        String userId = request.getParameter("userId");
        Member member = memberRepository.findByUserId(userId);

        if (member == null || StringUtils.isEmpty(member.getId())) {
            return new ResponseEntity<>("bad", HttpStatus.NOT_ACCEPTABLE);
        }

        String token = jwtService.create(member.getUserId(), member, "member");
//        response.setHeader("Authorization", token);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
