import styles from './AdministratorProfile.module.css';
import { useSelector } from 'react-redux';

const AdministratorProfile = () => {
  const { id, email } = useSelector((state) => state.auth);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profilePicture} />
        <div className={styles.profileInfo}>
          <div className={styles.adminMemberId}>{id}</div>
          <div className={styles.adminEmail}>{email}</div>
        </div>
      </div>
    </>
  );
};

export default AdministratorProfile;
