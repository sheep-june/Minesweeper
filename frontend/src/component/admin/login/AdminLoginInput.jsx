import styles from './AdminLoginForm.module.css';

const AdminLoginInput = ({ ...props }) => {
  return (
    <>
      <input className={styles.loginInput} {...props} />
    </>
  );
};

export default AdminLoginInput;
