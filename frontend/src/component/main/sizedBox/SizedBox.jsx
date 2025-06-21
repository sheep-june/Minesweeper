import PropTypes from 'prop-types';

const SizedBox = ({ height, width }) => {
  return <div style={{ height: height, width: width }}></div>;
};

SizedBox.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default SizedBox;
