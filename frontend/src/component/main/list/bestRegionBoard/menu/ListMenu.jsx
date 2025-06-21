import PropTypes from 'prop-types';

const ListMenu = ({ menuText, ...props }) => {
  return (
    <div {...props} style={{ cursor: 'pointer' }}>
      {menuText}
    </div>
  );
};

ListMenu.propTypes = {
  menuText: PropTypes.string,
};

export default ListMenu;
