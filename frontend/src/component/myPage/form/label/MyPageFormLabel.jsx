import PropTypes from 'prop-types';
import styles from './MyPageFormLabel.module.css';

const MyPageFormLabel = ({ labelText }) => {
  return <div className={styles.label}>{labelText}</div>;
};

MyPageFormLabel.propTypes = {
  labelText: PropTypes.string,
};

export default MyPageFormLabel;
