import Header from '../../component/header/Header.jsx';
import NavigationBar from '../../component/navigation/NavigationBar.jsx';
import Title from '../../component/main/title/Title.jsx';
import Main from '../../component/main/Main.jsx';
import Footer from '../../component/footer/Footer.jsx';
import styles from './TotalBoardList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoardPostList,
  fetchTotalBoardList,
} from '../../redux/slices/board/boardThunk.js';
import { useNavigate } from 'react-router-dom';

const TotalBoardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalBoardList, isLoading, error } = useSelector(
    (state) => state.board,
  );

  useEffect(() => {
    dispatch(fetchTotalBoardList());
  }, [dispatch]);

  const handleBoardListItemClick = async (boardId) => {
    navigate('/board/' + boardId);
  };

  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />
      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />

      <Main
        Content={
          <>
            {/*제목 컴포넌트*/}
            <Title titleText={'전체 지역 게시판'} />

            {/* 게시판 리스트 컨테이너 */}
            <div className={styles.boardList}>
              {totalBoardList &&
              Array.isArray(totalBoardList) &&
              totalBoardList.length > 0 ? (
                totalBoardList.map((item) => (
                  <div
                    className={styles.boardListItem}
                    key={item.id}
                    onClick={() => handleBoardListItemClick(item.id)}
                  >
                    {item.boardName}
                  </div> // 'id' 사용 권장
                ))
              ) : (
                <div>게시판이 없습니다.</div>
              )}
            </div>
          </>
        }
      />

      {/* 홈화면 푸터 컴포넌트 */}
      <Footer />
    </>
  );
};

export default TotalBoardList;
