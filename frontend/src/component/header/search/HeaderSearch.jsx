import { useState } from 'react';
import styles from './HeaderSearch.module.css';
import HeaderSearchButton from './button/HeaderSearchButton.jsx';
import HeaderSearchInput from './input/HeaderSearchInput.jsx';
import { useNavigate } from 'react-router-dom';

const HeaderSearch = ({ ...props }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    navigate('/searchPost/' + search);
  };

  return (
    <div {...props}>
      <div className={styles.headerSearchContainer}>
        {/*검색창*/}
        <HeaderSearchInput value={search} onChange={handleSearchChange} />
        {/*검색버튼*/}
        <HeaderSearchButton onClick={handleSearchButtonClick} />
      </div>
    </div>
  );
};

export default HeaderSearch;
