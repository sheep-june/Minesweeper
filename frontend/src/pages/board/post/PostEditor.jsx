import Header from '../../../component/header/Header.jsx';
import NavigationBar from '../../../component/navigation/NavigationBar.jsx';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../../../component/main/Main.jsx';
import AccessDenied from '../../../component/main/board/editor/AccessDenied.jsx';
import EditorForm from '../../../component/main/board/editor/EditorForm.jsx';
import Footer from '../../../component/footer/Footer.jsx';

const PostEditor = () => {
  const region = useSelector((state) => state.auth.region);
  const { boardRegion } = useParams();
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    if (region !== boardRegion) {
      setHasAccess(false);
    }
  }, [region, boardRegion]);

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
              <EditorForm boardRegion={boardRegion} />
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

export default PostEditor;
