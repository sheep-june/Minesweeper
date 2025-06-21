import PropTypes from 'prop-types';

// 네비게이션 버튼 컴포넌트
const NavigationMenuButton = ({ buttonName, ...props }) => (
  <div {...props} style={{ cursor: 'pointer' }}>
    {buttonName}
  </div>
);

NavigationMenuButton.propTypes = {
  // 네비게이션 버튼 이름
  buttonName: PropTypes.string.isRequired,
};

export default NavigationMenuButton;
