import Header from '../../../component/header/Header.jsx';
import NavigationBar from '../../../component/navigation/NavigationBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../../../component/main/Main.jsx';
import AccessDenied from '../../../component/main/board/editor/AccessDenied.jsx';
import EditorForm from '../../../component/main/board/editor/EditorForm.jsx';
import Footer from '../../../component/footer/Footer.jsx';
import { fetchPostDetail } from '../../../redux/slices/board/boardThunk.js';

const ModifyEditor = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);
  const postDetail = useSelector((state) => state.board.postDetail);

  const { postId } = useParams();
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    dispatch(fetchPostDetail({ postId }));
  }, [dispatch]);

  useEffect(() => {
    if (postDetail.member.id !== id) {
      setHasAccess(false);
    }
  }, [id, postDetail]);

  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />
      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />

      <Main
        Content={
          <>
            {hasAccess ? (
              <EditorForm
                boardRegion={postDetail.regionBoardName}
                modifyData={postDetail}
              />
            ) : (
              <AccessDenied />
            )}
          </>
        }
      />
      <Footer />
    </>
  );
};

export default ModifyEditor;
