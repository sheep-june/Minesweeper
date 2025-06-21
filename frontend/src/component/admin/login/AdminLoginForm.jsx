import styles from './AdminLoginForm.module.css';
import SizedBox from '../../main/sizedBox/SizedBox.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../redux/slices/login/loginSlice.js';
import AdminLoginInput from './AdminLoginInput.jsx';
import { adminLogin } from '../../../redux/slices/admin/adminThunk.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  // Redux의 dispatch 함수를 가져옵니다.
  const dispatch = useDispatch();

  // 페이지 네비게이션을 위한 navigate 함수를 가져옵니다.
  const navigate = useNavigate();

  // Redux 상태에서 로그인 폼 데이터를 가져옵니다.
  const formData = useSelector((state) => state.login.formData);

  // Redux 상태에서 관리자 로그인 상태(isLoggedIn)와 에러 메시지(error)를 가져옵니다.
  const { isLoggedIn, error } = useSelector((state) => state.admin);

  /**
   * 입력 필드가 변경될 때 호출되는 핸들러 함수입니다.
   * @param {Object} e - 이벤트 객체
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력된 값을 Redux 상태로 업데이트합니다.
    dispatch(updateFormData({ field: name, value }));
  };

  /**
   * 폼 유효성 검사를 수행하는 함수입니다.
   * @returns {Object} - 유효성 검사 결과와 오류 메시지
   */
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

  /**
   * 폼 제출 시 호출되는 함수입니다.
   * @param {Object} e - 이벤트 객체
   */
  const handleLogIn = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    // 폼 유효성 검사를 수행합니다.
    const { isValid, errors } = validateForm();

    if (!isValid) {
      // 유효하지 않은 경우 오류 메시지를 표시합니다.
      alert(`${errors.id} ${errors.password}`);
      return;
    }

    // 로그인 액션을 디스패치하여 로그인 요청을 보냅니다.
    dispatch(adminLogin(formData));
  };

  /**
   * isLoggedIn 상태가 변경될 때 호출되는 useEffect 훅입니다.
   * 로그인에 성공하면 관리자 대시보드로 이동합니다.
   */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);

  /**
   * error 상태가 변경될 때 호출되는 useEffect 훅입니다.
   * 에러가 발생하면 에러 메시지를 알림으로 표시합니다.
   */
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    // 폼 제출 시 handleLogIn 함수를 호출합니다.
    <form onSubmit={handleLogIn} className={styles.loginForm}>
      {/* 아이디 입력 필드 */}
      <AdminLoginInput
        value={formData.id}
        onChange={handleInputChange}
        name={'id'}
        type='text'
        placeholder={'아이디'}
      />
      {/* 입력 필드 간의 간격을 조절합니다. */}
      <SizedBox height={33} />

      {/* 비밀번호 입력 필드 */}
      <AdminLoginInput
        value={formData.password}
        onChange={handleInputChange}
        name={'password'}
        type='password'
        placeholder={'비밀번호'}
      />
      {/* 입력 필드 간의 간격을 조절합니다. */}
      <SizedBox height={69} />

      {/* 로그인 버튼 */}
      <button type='submit' className={styles.adminLoginButton}>
        로그인
      </button>
    </form>
  );
};

// AdminLoginForm 컴포넌트를 기본으로 내보냅니다.
export default AdminLoginForm;
