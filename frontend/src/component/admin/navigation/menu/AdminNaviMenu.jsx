import styles from './AdminNaviMenu.module.css';
import PropTypes from 'prop-types';

const AdminNaviMenu = ({ menuText, iconPath, ...props }) => {
  return (
    <div {...props} className={styles.container}>
      <img className={styles.menuIcon} src={iconPath} alt='메뉴 아이콘' />
      {menuText}
    </div>
  );
};

AdminNaviMenu.propTypes = {
  menuText: PropTypes.string,
  iconPath: PropTypes.string,
};

export default AdminNaviMenu;
