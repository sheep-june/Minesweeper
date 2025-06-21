import MyPageTitle from '../title/MyPageTitle.jsx';
import MyPageFormLabel from './label/MyPageFormLabel.jsx';
import styles from './MyPageForm.module.css';
import MyPageFormInput from './input/MyPageFormInput.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AccessDenied from '../../main/board/editor/AccessDenied.jsx';
import { useNavigate } from 'react-router-dom';

const MyPageForm = () => {
  const navigate = useNavigate();

  const { id, email, region } = useSelector((state) => state.auth);
  const [hasAccess, setHasAccess] = useState(true);

  // 상태 변수 추가
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 에러 메시지 상태
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id === null) setHasAccess(false);
  }, [id]);

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지

    // 초기화
    setErrors({});

    const newErrors = {};

    // 유효성 검사: 모든 비밀번호 필드가 채워져 있는지 확인
    if (!currentPassword.trim()) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = '새로운 비밀번호를 입력해주세요.';
    }

    if (!confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = '비밀번호 확인을 입력해주세요.';
    }

    // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      newErrors.confirmNewPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 에러가 있는 경우 설정하고 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 서버로 요청 보내기
    try {
      const response = await fetch('/api/auth/modifyPassword', {
        method: 'POST', // 또는 PUT, 서버 API에 따라 다름
        headers: {
          'Content-Type': 'application/json',
          // 필요한 경우 인증 헤더 추가
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 통신에 문제가 발생했습니다.');
    }
  };

  return (
    <>
      {hasAccess ? (
        <form className={styles.container} onSubmit={handleSubmit}>
          <MyPageTitle />

          <MyPageFormLabel labelText={'아이디'} />
          <MyPageFormInput value={id} disabled />

          <MyPageFormLabel labelText={'비밀번호'} />
          <MyPageFormInput
            type='password'
            placeholder={'비밀번호 변경 시 입력'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {errors.currentPassword && (
            <p className={styles.error}>{errors.currentPassword}</p>
          )}

          <MyPageFormLabel labelText={'새로운 비밀번호'} />
          <MyPageFormInput
            type='password'
            placeholder={'비밀번호 변경 시 입력'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword}</p>
          )}

          <MyPageFormLabel labelText={'새로운 비밀번호 확인'} />
          <MyPageFormInput
            type='password'
            placeholder={'비밀번호 변경 시 입력'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {errors.confirmNewPassword && (
            <p className={styles.error}>{errors.confirmNewPassword}</p>
          )}

          <MyPageFormLabel labelText={'이메일'} />
          <MyPageFormInput value={email} disabled />

          <MyPageFormLabel labelText={'인증 지역'} />
          <MyPageFormInput value={region} disabled />

          <div className={styles.submitButtonDiv}>
            <button
              type='button'
              className={styles.cancelButton}
              onClick={handleCancelButtonClick}
            >
              취소
            </button>
            <button type='submit' className={styles.submitButton}>
              수정
            </button>
          </div>
        </form>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default MyPageForm;
