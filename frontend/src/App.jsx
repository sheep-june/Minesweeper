import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signUp/SignUp.jsx';
import ScrollToTop from './component/common/scroll/ScrollToTop.jsx';
import TotalBoardList from './pages/board/TotalBoardList.jsx';
import BoardList from './pages/board/BoardList.jsx';
import AdminLogin from './pages/admin/login/AdminLogin.jsx';
import AdminHome from './pages/admin/home/AdminHome.jsx';
import BoardDetail from './pages/board/detail/BoardDetail.jsx';
import ManualAuth from './pages/admin/home/member/manualAuth/ManualAuth.jsx';
import AdminRoute from './component/common/route/AdminRoute.jsx';
import PostEditor from './pages/board/post/PostEditor.jsx';
import NoticeBoardList from './pages/board/NoticeBoardList.jsx';
import SearchPostList from './pages/board/search/SearchBoardList.jsx';
import MyPage from './pages/mypage/MyPage.jsx';
import MemberManagement from './pages/admin/home/member/MemberManagement.jsx';
import ModifyEditor from './pages/board/post/ModifyEditor.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/*홈화면 경로*/}
        <Route path={'/'} element={<Home />} />
        {/*로그인화면 경로*/}
        <Route path={'/login'} element={<Login />} />
        {/*회원가입 경로*/}
        <Route path={'/signUp'} element={<SignUp />} />
        {/*전체 게시판 리스트 경로*/}
        <Route path={'/totalBoard'} element={<TotalBoardList />} />
        {/*지역 게시판 글 리스트 경로*/}
        <Route path={'/board/:boardId'} element={<BoardList />} />
        {/*지역 게시판 게시글 경로*/}
        <Route path={'/boardDetail/:postId'} element={<BoardDetail />} />
        {/*지역 게시판 게시글 작성 경로*/}
        <Route path={'/postEditor/:boardRegion'} element={<PostEditor />} />
        {/*지역 게시판 게시글 작성 경로*/}
        <Route path={'/modifyEditor/:postId'} element={<ModifyEditor />} />
        {/*공지사항 게시판 게시글 리스트 경로*/}
        <Route path={'/noticeBoard'} element={<NoticeBoardList />} />
        {/*검색 게시글 리스트 경로*/}
        <Route path={'/searchPost/:keyword'} element={<SearchPostList />} />
        {/*마이페이지 경로*/}
        <Route path={'/myPage'} element={<MyPage />} />

        {/*관리자 홈*/}
        <Route path={'/admin'} element={<AdminRoute element={AdminHome} />}>
          <Route path={'manualAuth'} element={<ManualAuth />} />
          <Route path={'memberManagement'} element={<MemberManagement />} />
        </Route>

        {/*관리자 로그인*/}
        <Route path={'/admin/login'} element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
