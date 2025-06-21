import styles from './LoginFormInput.module.css';
import PropTypes from "prop-types";

const LoginFormInput = ({ error, ...props }) => {
  return <><input {...props} className={styles.input} />{error && <div className={styles.errorMessage}>{error}</div>}</>;
};

LoginFormInput.propTypes = {
  error: PropTypes.string,
}

export default LoginFormInput;
