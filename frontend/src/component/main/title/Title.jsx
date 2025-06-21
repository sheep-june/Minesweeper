import styles from './Title.module.css';

const Title = ({ titleText }) => {
  return <div className={styles.container}>{titleText}</div>;
};

export default Title;
