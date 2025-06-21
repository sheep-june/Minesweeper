import styles from './BestRegionBoard.module.css';

import Title from '../../title/Title.jsx';
import ListMenu from './menu/ListMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBestRegionBoardList } from '../../../../redux/slices/board/boardThunk.js';
import { useNavigate } from 'react-router-dom';

const BestRegionBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bestRegionBoardList = useSelector(
    (state) => state.board.bestRegionBoardList,
  );

  useEffect(() => {
    dispatch(fetchBestRegionBoardList());
  }, [dispatch]);

  return (
    <>
      {/*제목 컴포넌트*/}
      <Title titleText={'가장 활발한 지역 게시판'} />
      {/*가장 활발한 지역 게시판 리스트*/}
      <div className={styles.listMenuContainer}>
        {bestRegionBoardList.map((bestRegionBoard) => (
          <ListMenu
            menuText={bestRegionBoard.boardName}
            key={bestRegionBoard.id}
            onClick={() => navigate('/board/' + bestRegionBoard.id)}
          />
        ))}
      </div>
    </>
  );
};

export default BestRegionBoard;
