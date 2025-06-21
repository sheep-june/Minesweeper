import styles from './AdminHome.module.css';
import AdminNavigationBar from '../../../component/admin/navigation/AdminNavigationBar.jsx';
import { Outlet } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className={styles.container}>
      <AdminNavigationBar />
      <Outlet />
    </div>
  );
};

export default AdminHome;
