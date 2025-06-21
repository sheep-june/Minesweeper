import styles from './HeaderSearchInput.module.css';
import PropTypes from 'prop-types';

const HeaderSearchInput = ({ value, onChange, ...props }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        {...props}
        className={styles.headerSearchInput}
        type='text'
        placeholder={'지역 게시판, 내용 검색'}
      />
    </>
  );
};

HeaderSearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default HeaderSearchInput;
