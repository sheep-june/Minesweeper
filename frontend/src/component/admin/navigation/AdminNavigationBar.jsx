import styles from './AdminNavigationBar.module.css';
import AdministratorProfile from './profile/AdministratorProfile.jsx';
import AdminNaviLogo from './logo/AdminNaviLogo.jsx';
import AdminNaviCategory from './category/AdminNaviCategory.jsx';
import AdminNaviMenu from './menu/AdminNaviMenu.jsx';
import { useNavigate } from 'react-router-dom';
import AdminLogoutButton from './button/logout/AdminLogoutButton.jsx';

const AdminNavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <AdminNaviLogo />
      <AdministratorProfile />
      <AdminNaviCategory />
      <AdminNaviMenu
        iconPath={'/assets/admin/navi/active_circle.png'}
        menuText={'유저 수동인증 목록'}
        onClick={() => navigate('manualAuth')}
      />
      <AdminNaviMenu
        iconPath={'/assets/admin/navi/active_circle.png'}
        menuText={'전체 유저 관리'}
        onClick={() => navigate('memberManagement')}
      />
      <AdminLogoutButton />
    </div>
  );
};

export default AdminNavigationBar;
