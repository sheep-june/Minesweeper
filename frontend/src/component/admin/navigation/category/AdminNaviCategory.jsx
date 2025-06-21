import styles from './AdminNaviCategory.module.css';

const AdminNaviCategory = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.categoryIcon}
        src='/assets/admin/navi/category_icon.png'
        alt='카테고리 아이콘'
      />
      유저관리
    </div>
  );
};

export default AdminNaviCategory;
