package com.inside.realty_inside_1002.common.security;

import com.inside.realty_inside_1002.common.entity.Member;
import com.inside.realty_inside_1002.common.entity.Role;
import com.inside.realty_inside_1002.common.exception.APIException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    // generate JWT token
    public String generateToken(Member member) {
        String memberId = member.getId();
        Role role = member.getRole();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        String token = Jwts.builder()
                .setSubject(memberId)
                .claim("role", role.name())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    private Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }

    // get username from Jwt token
    public String getUsername(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();

        return username;
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
        return claims.get("role").toString();
    }

    public String getUserId(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String userId = claims.getSubject();

        return userId;
    }

    public boolean validateToken(String token) {
        log.debug("Validating token {}", token);
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parse(token);
            log.debug("Token validated");
            return true;
        } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            throw new APIException(HttpStatus.UNAUTHORIZED, ex.getMessage());
        }
    }

    public String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authorization")) {
                    String token = cookie.getValue();
                    if (token.startsWith("Bearer")) {
                        return token.substring(6); // "Bearer "를 제거하고 실제 토큰만 반환
                    }
                    return token;
                }
            }
        }
        return null;
    }

//    public Cookie getTokenCookie(Member member) {
//
//        String newToken = generateToken(member);
//
//        List<MemberToken> memberTokens = memberTokenRepository.findByMember(member);
//
//        if (!memberTokens.isEmpty()) {
//            memberTokens.forEach(MemberToken::deactivate);
//        }
//
//        memberTokenRepository
//                .save(MemberToken.builder()
//                        .token(newToken)
//                        .active(true)
//                        .member(member)
//                        .build());
//
//        Cookie cookie = new Cookie("Authorization", "Bearer" + newToken);
//        cookie.setHttpOnly(false);
//        cookie.setSecure(false);
//        cookie.setPath("/");
//
//        return cookie;
//    }
}
