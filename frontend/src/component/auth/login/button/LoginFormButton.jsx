import styles from './LoginFormButton.module.css';
import PropTypes from 'prop-types';

const LoginFormButton = ({ buttonText, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {buttonText}
    </button>
  );
};

LoginFormButton.propTypes = {
  buttonText: PropTypes.string,
};

export default LoginFormButton;
