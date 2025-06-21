import styles from './AdminLogoutButton.module.css';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../../../../redux/slices/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

/**
 * AdminLogoutButton 컴포넌트는 관리자의 로그아웃 기능을 제공합니다.
 * 버튼을 클릭하면 인증 상태를 초기화하고 로그인 페이지로 이동합니다.
 *
 * @returns {JSX.Element} 로그아웃 버튼 컴포넌트
 */
const AdminLogoutButton = () => {
  // Redux의 dispatch 함수를 가져옵니다.
  const dispatch = useDispatch();

  // 페이지 네비게이션을 위한 navigate 함수를 가져옵니다.
  const navigate = useNavigate();

  /**
   * 로그아웃 버튼이 클릭될 때 호출되는 함수입니다.
   * 인증 상태를 초기화하고 로그인 페이지로 이동합니다.
   */
  const handleLogout = () => {
    // clearAuth 액션을 디스패치하여 인증 상태를 초기화합니다.
    dispatch(clearAuth());

    // '/admin/login' 경로로 페이지를 이동시킵니다.
    navigate('/admin/login');
  };

  return (
    // 로그아웃 버튼을 렌더링합니다.
    // 클릭 시 handleLogout 함수가 호출됩니다.
    <div className={styles.logoutButton} onClick={handleLogout}>
      로그아웃
    </div>
  );
};

// AdminLogoutButton 컴포넌트를 기본으로 내보냅니다.
export default AdminLogoutButton;
