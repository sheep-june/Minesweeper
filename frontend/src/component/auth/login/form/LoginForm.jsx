// 필요한 모듈과 컴포넌트를 임포트합니다.
import styles from './LoginForm.module.css';
import LoginFormInput from './input/LoginFormInput.jsx';
import SizedBox from '../../../main/sizedBox/SizedBox.jsx';
import LoginFormButton from '../button/LoginFormButton.jsx';
import FlexCenterDiv from '../../../common/div/FlexCenterDiv.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForm,
  updateFormData,
} from '../../../../redux/slices/login/loginSlice.js';
import { login } from '../../../../redux/slices/login/loginThunk.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// LoginForm 컴포넌트 정의
const LoginForm = () => {
  const token = useSelector((state) => state.auth.token);
  const { isLoggedIn, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  // Redux 디스패치 함수를 가져옵니다.
  const dispatch = useDispatch();

  // Redux 상태에서 로그인 폼 데이터를 가져옵니다.
  const formData = useSelector((state) => state.login.formData);

  // 입력 필드 변경 시 호출되는 핸들러 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력된 값을 Redux 상태로 업데이트합니다.
    dispatch(updateFormData({ field: name, value }));
  };

  // 폼 유효성 검사를 수행하는 함수
  const validateForm = () => {
    // 오류 메시지를 저장할 객체를 초기화합니다.
    const errors = {
      id: '',
      password: '',
    };
    let isValid = true;

    // 아이디 입력값 검증
    if (!formData.id.trim()) {
      errors.id = '아이디를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 입력값 검증
    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    }

    // 유효성 검사 결과를 반환합니다.
    return {
      isValid,
      errors,
    };
  };

  // 폼 제출 시 호출되는 함수
  const handleLogIn = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막습니다.
    const { isValid, errors } = validateForm(); // 폼 유효성 검사를 수행합니다.

    if (!isValid) {
      // 유효하지 않은 경우 오류 메시지를 표시합니다.
      alert(`${errors.id} ${errors.password}`);
      return;
    }

    // 로그인 액션을 디스패치하여 로그인 요청을 보냅니다.
    dispatch(login(formData));
  };

  /**
   * 회원가입 성공 시 알림 및 폼 초기화
   */
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(resetForm());
      // 로그인 페이지로 이동
      navigate('/');
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  });

  // 컴포넌트의 JSX를 반환합니다.
  return (
    <div className={styles.container}>
      {/* 폼 요소로 감싸서 제출 시 handleLogIn 함수를 호출합니다. */}
      <form onSubmit={handleLogIn}>
        {/* 아이디 입력 필드 */}
        <LoginFormInput
          type='text'
          value={formData.id}
          name='id'
          onChange={handleInputChange}
          placeholder='아이디'
        />
        <SizedBox height={20} /> {/* 간격 조정을 위한 컴포넌트 */}
        {/* 비밀번호 입력 필드 */}
        <LoginFormInput
          type='password'
          value={formData.password}
          name='password'
          onChange={handleInputChange}
          placeholder='비밀번호'
        />
        <SizedBox height={35} />
        {/* 로그인 버튼을 폼 내부에 배치하여 제출 동작을 연결합니다. */}
        <FlexCenterDiv
          Content={<LoginFormButton type='submit' buttonText={'로그인'} />}
        />
      </form>
      <SizedBox height={35} />
      {/* 회원가입 및 비밀번호 찾기 링크를 표시합니다. */}
      <FlexCenterDiv
        Content={
          <>
            <a
              href={'/signUp'}
              style={{
                fontSize: '20px',
                fontWeight: '300',
                marginRight: '10px',
              }}
            >
              회원가입
            </a>
          </>
        }
      />
    </div>
  );
};

// 컴포넌트를 내보냅니다.
export default LoginForm;
