// 홈 페이지 컴포넌트
import Header from '../../component/header/Header.jsx'; // 헤더 컴포넌트 임포트
import NavigationBar from '../../component/navigation/NavigationBar.jsx'; // 네비게이션 바 컴포넌트 임포트
import Main from '../../component/main/Main.jsx'; // 메인 콘텐츠 컴포넌트 임포트
import BestRegionBoard from '../../component/main/list/bestRegionBoard/BestRegionBoard.jsx'; // 가장 활발한 지역 게시판 컴포넌트 임포트
import BestLikeList from '../../component/main/list/bestLikeList/BestLikeList.jsx'; // 실시간 인기글 리스트 컴포넌트 임포트
import Footer from '../../component/footer/Footer.jsx'; // 푸터 컴포넌트 임포트

// Home 컴포넌트 정의 및 내보내기
export default function Home() {
  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />

      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />

      {/* 홈화면 중단 부분 컴포넌트, 메인 콘텐츠를 전달 */}
      <Main Content={mainContent()} />

      {/* 홈화면 푸터 컴포넌트 */}
      <Footer />
    </>
  );
}

// 메인 콘텐츠를 반환하는 함수 정의
const mainContent = () => {
  return (
    <>
      {/* 가장 활발한 지역 게시판 컴포넌트 */}
      <BestRegionBoard />

      {/* 실시간 인기글 리스트 컴포넌트 */}
      <BestLikeList />
    </>
  );
};
