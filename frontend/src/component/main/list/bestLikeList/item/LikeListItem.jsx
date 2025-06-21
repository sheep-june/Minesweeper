import styles from './LikeListItem.module.css';
import commonStyles from '../../../../../CommonStyles.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LikeListItem = ({ bestLikePost }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate('/boardDetail/' + bestLikePost.id);
  };

  return (
    <div className={styles.container} onClick={handlePostClick}>
      <div className={`${commonStyles.flex} ${commonStyles.alignCenter}`}>
        <div className={styles.picture}>
          {bestLikePost.featuredImagePath && (
            <img src={bestLikePost.featuredImagePath} />
          )}
        </div>
        <div className={styles.title}>{bestLikePost.title}</div>
      </div>
      <div
        className={`${commonStyles.flex} ${commonStyles.alignCenter} ${styles.registrationFont}`}
      >
        {bestLikePost.regionBoardName} |{' '}
        {bestLikePost.createdTime.split('T')[0]}
      </div>
    </div>
  );
};

LikeListItem.propTypes = {
  bestLikePost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    createdTime: PropTypes.string,
    regionBoardName: PropTypes.string,
    featuredImagePath: PropTypes.string,
  }),
};

export default LikeListItem;
