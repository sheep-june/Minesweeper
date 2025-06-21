import styles from './Main.module.css';
import PropTypes from 'prop-types';

const Main = ({ Content }) => (
  <div className={styles.container}>
    <div className={styles.contentContainer}>{Content}</div>
  </div>
);

Main.propTypes = { Content: PropTypes.element };

export default Main;
