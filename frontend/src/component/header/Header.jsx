import styles from './Header.module.css';
import Logo from './logo/Logo.jsx';
import HeaderSearch from './search/HeaderSearch.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../redux/slices/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Header = () => (
  <div className={styles.headerContainer}>
    <div className={styles.headerDiv}>
      {/*로고 컴포넌트*/}
      <Logo className={styles.logo} />
      {/*헤더 검색창*/}
      <HeaderSearch />
      {/*로그인 버튼*/}
      <LoginButton />
    </div>
  </div>
);

const LoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/');
  };

  const handleClickMyPage = () => {
    navigate('/myPage');
  };

  return (
    <>
      {id !== null ? (
        <div className={styles.loginDiv}>
          <a className={styles.loginButton} onClick={handleClickMyPage}>
            마이페이지
          </a>
          <a className={styles.loginButton} onClick={handleLogout}>
            로그아웃
          </a>
        </div>
      ) : (
        <div className={styles.loginDiv}>
          <a href={'/login'} className={styles.loginButton}>
            로그인
          </a>
        </div>
      )}
    </>
  );
};

export default Header;
