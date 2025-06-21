package com.inside.realty_inside_1002.common.config;

import com.inside.realty_inside_1002.common.security.JwtAuthenticationEntryPoint;
import com.inside.realty_inside_1002.common.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration // 이 클래스가 스프링 설정 클래스임을 나타냅니다.
@EnableMethodSecurity // 메서드 수준의 보안을 활성화하여, 메서드에 대한 보안 애노테이션(@PreAuthorize 등)을 사용할 수 있게 합니다.
@RequiredArgsConstructor // Lombok을 사용하여 final 필드들에 대한 생성자를 자동으로 생성합니다.
public class SecurityConfig {

    // 사용자 상세 정보를 제공하는 서비스
    private final UserDetailsService userDetailsService;

    // 인증 예외 처리를 위한 엔트리 포인트
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    // JWT 기반 인증 필터
    private final JwtAuthenticationFilter authenticationFilter;

    // 인증이 필요한 엔드포인트 패턴
    private static final String[] AUTHENTICATE_LIST = {"api/authentication/**"};

    /**
     * 비밀번호 암호화를 위한 PasswordEncoder 빈 정의.
     * BCryptPasswordEncoder를 사용하여 비밀번호를 안전하게 암호화합니다.
     */
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManager 빈 정의.
     * 스프링 시큐리티의 인증 매니저를 빈으로 등록하여 인증 과정을 관리합니다.
     *
     * @param configuration 인증 구성 정보
     * @return AuthenticationManager 인스턴스
     * @throws Exception 예외 발생 시
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * 보안 필터 체인 설정.
     * HTTP 보안 설정을 정의하여 요청에 대한 접근 제어, 예외 처리, 세션 관리 등을 설정합니다.
     *
     * @param http HttpSecurity 인스턴스
     * @return SecurityFilterChain 인스턴스
     * @throws Exception 예외 발생 시
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 보호 비활성화
                .csrf(csrf -> csrf.disable())

                // HTTP 요청에 대한 권한 설정
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(AUTHENTICATE_LIST).authenticated() // AUTHENTICATE_LIST에 포함된 엔드포인트는 인증 필요
                        .anyRequest().permitAll() // 그 외의 모든 요청은 인증 없이 접근 허용
                )

                // 인증 예외 처리 설정
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint) // 인증 예외 발생 시 처리할 엔트리 포인트 지정
                )

                // 세션 관리 설정
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않고 상태를 유지하지 않음
                )

                // CORS 설정 기본값 사용
                .cors(withDefaults());

        // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 전에 추가하여 JWT 토큰을 먼저 처리하도록 설정
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 설정을 기반으로 SecurityFilterChain 빌드
        return http.build();
    }

    /**
     * 인증 성공 시 리다이렉트할 URL을 처리하는 핸들러 빈 정의.
     * 인증이 성공하면 루트 경로("/")로 리다이렉트됩니다.
     *
     * @return SimpleUrlAuthenticationSuccessHandler 인스턴스
     */
    @Bean
    public SimpleUrlAuthenticationSuccessHandler authenticationSuccessHandler() {
        return new SimpleUrlAuthenticationSuccessHandler("/");
    }
}