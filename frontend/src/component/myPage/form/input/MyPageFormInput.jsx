import styles from './MyPageFormInput.module.css';

const MyPageFormInput = ({ ...props }) => {
  return <input {...props} className={styles.input} />;
};

export default MyPageFormInput;
