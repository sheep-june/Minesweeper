import styles from './HeaderSearchButton.module.css';

const HeaderSearchButton = ({ ...props }) => {
  return (
    <>
      <button className={styles.headerSearchButton} {...props}>
        <img
          className={styles.searchIcon}
          src='/assets/header/search/search_icon.png'
          alt='돋보기'
        />
      </button>
    </>
  );
};

export default HeaderSearchButton;
