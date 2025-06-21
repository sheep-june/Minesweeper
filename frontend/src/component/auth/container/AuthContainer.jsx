import styles from './AuthContainer.module.css';
import LoginLogo from '../login/logo/LoginLogo.jsx';
import PropTypes from 'prop-types';

const AuthContainer = ({ Content }) => (
  <>
    <div className={styles.container}>
      <LoginLogo />
      {Content}
    </div>
  </>
);

AuthContainer.propTypes = {
  Content: PropTypes.object,
};

export default AuthContainer;
