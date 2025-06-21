import PropTypes from 'prop-types';
import styles from './BoardTypeSelectButton.module.css';

const BoardTypeSelectButton = ({ buttonText, selectedBoardType, ...props }) => {
  return (
    <div
      className={`${buttonText === selectedBoardType ? styles.activeButton : styles.container}`}
      {...props}
    >
      {buttonText}
    </div>
  );
};

BoardTypeSelectButton.propTypes = {
  buttonText: PropTypes.string,
};

export default BoardTypeSelectButton;
