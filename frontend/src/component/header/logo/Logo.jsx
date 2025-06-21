import { useNavigate } from 'react-router-dom';

export default function Logo({ ...props }) {
  const navigate = useNavigate();

  return (
    <img
      {...props}
      src='/assets/logo.png'
      alt='로고'
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/')}
    />
  );
}
