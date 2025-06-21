import { useState } from 'react';
import styles from './ReplyForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPostDetail } from '../../../redux/slices/board/boardThunk.js';

const ReplyForm = ({ postId, replyId }) => {
  const [reply, setReply] = useState(''); // 댓글 내용 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, token } = useSelector((state) => state.auth);

  // textarea 내용이 변경될 때 상태 업데이트
  const handleChange = (e) => {
    setReply(e.target.value);
  };

  // 댓글 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    if (!reply.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/board/createReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: reply,
          postId: postId,
          replyId: replyId,
          member: { id: id },
        }), // 서버에서 기대하는 데이터 형식에 맞게 수정
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '댓글 등록에 실패했습니다.');
      }
      setReply(''); // 입력창 초기화
    } catch (err) {
      if (err.message.includes('JWT expired')) {
        // JWT 만료 에러를 식별하여 특정 에러를 던집니다.
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        navigate('/login');
      }

      console.error('댓글 등록 오류:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      dispatch(fetchPostDetail({ postId: postId, memberId: id }));
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.replyContent}
        value={reply}
        onChange={handleChange}
        placeholder='댓글을 입력하세요...'
        rows='4' // 필요에 따라 행 수 조정
      ></textarea>
      <div className={styles.replyConfirmButtonDiv}>
        <button
          className={styles.replyConfirm}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '등록 중...' : '댓글등록'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ReplyForm;
