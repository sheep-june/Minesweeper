import styles from './LoginLogo.module.css';
import { useNavigate } from 'react-router-dom';

const LoginLogo = () => {
  const navigate = useNavigate();
  return (
    <img
      className={styles.logo}
      src='/assets/logo.png'
      alt='로고'
      onClick={() => navigate('/')}
    />
  );
};
export default LoginLogo;
