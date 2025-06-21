import styles from './NavigationBar.module.css';
import NavigationMenuButton from './button/NavigationMenuButton.jsx';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleTotalBoardListClick = (e) => {
    e.preventDefault();
    navigate('/totalBoard');
  };

  const handleNoticeBoardListClick = (e) => {
    e.preventDefault();
    navigate('/noticeBoard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuDiv}>
        {/*네비게이션 메뉴 버튼*/}
        <NavigationMenuButton
          buttonName={'지역게시판'}
          onClick={handleTotalBoardListClick}
        />
        <NavigationMenuButton
          buttonName={'공지사항'}
          onClick={handleNoticeBoardListClick}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
