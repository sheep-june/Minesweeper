// 로그인 페이지 컴포넌트
import LoginForm from '../../component/auth/login/form/LoginForm.jsx'; // 로그인 폼 컴포넌트 임포트
import AuthContainer from '../../component/auth/container/AuthContainer.jsx'; // 인증 컨테이너 컴포넌트 임포트

// Login 컴포넌트 정의
const Login = () => {
  return (
    // AuthContainer 컴포넌트에 Content prop으로 LoginForm을 전달
    <AuthContainer
      Content={
        <>
          <LoginForm /> {/* 로그인 폼 컴포넌트 렌더링 */}
        </>
      }
    />
  );
};

// Login 컴포넌트를 기본 내보내기로 설정
export default Login;
