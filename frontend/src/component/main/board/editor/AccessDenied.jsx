import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AccessDenied = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>권한이 없습니다.</h2>
      <p>3초 후에 이전 페이지로 돌아갑니다.</p>
      {/* 사용자가 즉시 돌아가고 싶을 경우 버튼 추가 */}
      <button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</button>
    </div>
  );
};

export default AccessDenied;
