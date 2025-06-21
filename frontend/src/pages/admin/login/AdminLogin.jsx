import styles from './AdminLogin.module.css';
import AdminLoginForm from '../../../component/admin/login/AdminLoginForm.jsx';

const AdminLogin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.firstDiv}></div>
        <div className={styles.secondDiv}>
          <AdminLoginForm />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
