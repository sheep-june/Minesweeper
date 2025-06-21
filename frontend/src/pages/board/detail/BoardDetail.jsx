import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostDetail,
  increasePostLike,
} from '../../../redux/slices/board/boardThunk.js';
import Header from '../../../component/header/Header.jsx';
import NavigationBar from '../../../component/navigation/NavigationBar.jsx';
import Main from '../../../component/main/Main.jsx';
import Footer from '../../../component/footer/Footer.jsx';
import Title from '../../../component/main/title/Title.jsx';
import PostInfo from '../../../component/main/board/detail/PostInfo.jsx';
import styles from './BoardDetail.module.css';
import BoardButton from '../../../component/admin/navigation/button/board/BoardButton.jsx';
import ReplyForm from './ReplyForm.jsx';
import SizedBox from '../../../component/main/sizedBox/SizedBox.jsx';

const BoardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { id, token, region } = useSelector((state) => state.auth);
  const { isLoding, postDetail } = useSelector((state) => state.board);

  const [selectedReply, setSelectedReply] = useState(null);

  useEffect(() => {
    dispatch(fetchPostDetail({ postId: postId, memberId: id }));
  }, [dispatch]);

  const handleToListButtonClick = () => {
    navigate('/board/' + postDetail.regionBoardId);
  };

  const handleLikeButtonClick = async () => {
    if (token === null) {
      alert('로그인 한 회원만 추천이 가능합니다.');
      return;
    }

    try {
      await dispatch(
        increasePostLike({ postId: postId, memberId: id, token: token }),
      ).unwrap();
    } catch (err) {
      if (err === 'JWT_EXPIRED') {
        // JWT 만료 시 로그인 페이지로 리다이렉트
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        navigate('/login');
      } else {
        console.error(err);
        // 기타 에러 처리
        alert(err);
      }
    }
  };

  const handleReplyClick = (replyId) => {
    setSelectedReply(replyId);
  };

  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />
      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />
      {isLoding ? (
        <div>로딩중</div>
      ) : (
        <Main
          Content={
            <>
              {/*제목 컴포넌트*/}
              <Title titleText={`${postDetail.regionBoardName} 게시판`} />
              <PostInfo postDetail={postDetail} />
              {/*본문 영역*/}
              <div
                className={styles.postContentContainer}
                dangerouslySetInnerHTML={{ __html: postDetail.content }}
              />

              <div className={styles.replyContainer}>
                {/*댓글 정보 Div*/}
                <div className={styles.repliesInfoDiv}>
                  <div
                    className={styles.totalRepliesLength}
                  >{`전체댓글 ${postDetail.replies === null ? '0' : postDetail.replies.length}개`}</div>
                  <div
                    className={styles.likeDiv}
                    onClick={handleLikeButtonClick}
                  >
                    <img
                      className={styles.likeIcon}
                      src='/assets/board/heart.png'
                      alt=''
                    />{' '}
                    추천하기
                  </div>
                </div>
                {postDetail.replies &&
                  postDetail.replies.map((reply) => (
                    <div
                      className={styles.repliesDiv}
                      key={reply.id}
                      onClick={() => {
                        handleReplyClick(reply.id);
                      }}
                    >
                      <div className={styles.parentReplyDiv}>
                        <div className={styles.replyWriterId}>
                          {reply.member.id}
                        </div>
                        <div className={styles.replyContentDiv}>
                          <div className={styles.replyContent}>
                            {reply.content}
                          </div>
                          <div className={styles.replyCreatedTime}>
                            {reply.createdTime.split('T')[0]}
                          </div>
                        </div>
                      </div>
                      {reply.childReplies &&
                        reply.childReplies.map((childReply) => (
                          <div
                            key={childReply.id}
                            className={styles.childReplyDiv}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img
                                style={{ width: '24px', height: '24px' }}
                                src='/assets/board/reply.png'
                                alt='대댓'
                              />
                              <div className={styles.replyWriterId}>
                                {childReply.member.id}
                              </div>
                            </div>
                            <div className={styles.replyContentDiv}>
                              <div className={styles.replyContent}>
                                {childReply.content}
                              </div>
                              <div className={styles.replyCreatedTime}>
                                {childReply.createdTime.split('T')[0]}
                              </div>
                            </div>
                          </div>
                        ))}
                      {id && selectedReply === reply.id && (
                        <ReplyForm postId={postId} replyId={reply.id} />
                      )}
                    </div>
                  ))}
              </div>
              {id && <ReplyForm postId={postId} />}
              <SizedBox height={70} />
              <div className={styles.toListButtonDiv}>
                <BoardButton
                  buttonText={'목록으로'}
                  onClick={handleToListButtonClick}
                  selectedType={'목록으로'}
                />
              </div>
            </>
          }
        />
      )}
      <Footer />
    </>
  );
};

export default BoardDetail;
