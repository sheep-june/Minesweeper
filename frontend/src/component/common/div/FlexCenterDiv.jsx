import PropTypes from 'prop-types';
import styles from './div.module.css';

const FlexCenterDiv = ({ Content, marginTop }) => (
  <div className={styles.flexCenter} style={{ marginTop: `${marginTop}px` }}>
    {Content}
  </div>
);

FlexCenterDiv.propTypes = {
  Content: PropTypes.object,
  marginTop: PropTypes.number,
};

export default FlexCenterDiv;
