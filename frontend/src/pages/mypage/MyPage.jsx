import Header from '../../component/header/Header.jsx';
import NavigationBar from '../../component/navigation/NavigationBar.jsx';
import Main from '../../component/main/Main.jsx';
import MyPageForm from '../../component/myPage/form/MyPageForm.jsx';

const MyPage = () => {
  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />
      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />
      <Main
        Content={
          <>
            <MyPageForm />
          </>
        }
      />
    </>
  );
};

export default MyPage;
