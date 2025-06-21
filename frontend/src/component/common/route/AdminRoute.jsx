import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ element: Element }) => {
  const role = useSelector((state) => state.auth.role);

  if (role === 'ADMIN' || role === 'DEVELOPER') {
    return <Element />;
  } else {
    // 접근 권한이 없을 경우 리디렉션 처리
    return <Navigate to='/admin/login' replace />;
  }
};

export default AdminRoute;
