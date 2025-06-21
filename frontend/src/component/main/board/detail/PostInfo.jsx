import styles from './PostInfo.module.css';
import PropTypes from 'prop-types';
import BoardButton from '../../../admin/navigation/button/board/BoardButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../../../redux/slices/board/boardThunk.js';

const PostInfo = ({ postDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, token } = useSelector((state) => state.auth);

  const handleModifyButtonClick = () => {
    navigate('/modifyEditor/' + postDetail.id);
  };
  const handleDeleteButtonClick = async () => {
    await dispatch(deletePost({ token: token, postId: postDetail.id }));
    navigate('/board/' + postDetail.regionBoardId);
  };

  return (
    <>
      <div className={styles.typeTitleButtonDiv}>
        <div className={styles.typeTitleDiv}>
          <div className={styles.postType}>{`[${postDetail.boardType}]`}</div>
          <div className={styles.postTitle}>{postDetail.title}</div>
        </div>
        {postDetail.member.id === id && (
          <div className={styles.modifyDeleteButtonDiv}>
            <BoardButton
              buttonText={'수정'}
              selectedType={''}
              onClick={handleModifyButtonClick}
            />
            <BoardButton
              buttonText={'삭제'}
              selectedType={'삭제'}
              onClick={handleDeleteButtonClick}
            />
          </div>
        )}
      </div>
      <div className={styles.postInfoDiv}>
        <div className={styles.writerCreatedTimeDiv}>
          <div className={styles.postWriterId}>{postDetail.member.id}</div>
          <div className={styles.postTitle}>
            {postDetail.createdTime.split('T')[0]}
          </div>
        </div>
        <div className={styles.countDiv}>
          <div>{`조회수 ${postDetail.viewCount}`}</div>
          <div>{`추천 ${postDetail.likeCount}`}</div>
          <div>{`댓글 ${postDetail.replies ? postDetail.replies.length : '0'}`}</div>
        </div>
      </div>
    </>
  );
};

PostInfo.propTypes = {
  postDetail: PropTypes.shape({
    boardType: PropTypes.string,
    title: PropTypes.string,
    member: PropTypes.shape({
      id: PropTypes.string,
    }),
    createdTime: PropTypes.string,
    viewCount: PropTypes.number,
    likeCount: PropTypes.number,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
  }),
};

export default PostInfo;
