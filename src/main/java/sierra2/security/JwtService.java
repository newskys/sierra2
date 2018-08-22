package sierra2.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Service
public class JwtService {
    private static final String SALT = "5kyus1ksh1n";

    public int getMemberId() {
        return (int) this.get("member").get("memberId");
    }

    public <T> String create(String key, T data, String subject) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("regDate", System.currentTimeMillis())
                .setSubject(subject) // 토큰 제목
                .claim(key, data) //
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();
    }

    public Map<String, Object> get(String key) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String jwt = request.getHeader("Authorization");
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SALT.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(jwt);
        } catch (Exception e) {
            throw new UnauthorizedException();
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> value = (LinkedHashMap<String, Object>) claims.getBody().get(key);
        return value;
    }

    private byte[] generateKey() {
        return SALT.getBytes(StandardCharsets.UTF_8);
    }

    public boolean isUsable(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(this.generateKey())
                    .parseClaimsJws(jwt);
            return true;

        } catch (Exception e) {
            throw new UnauthorizedException();
        }
    }
}