import Title from '../../title/Title.jsx';
import SizedBox from '../../sizedBox/SizedBox.jsx';
import LikeListItem from './item/LikeListItem.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestLikePostList } from '../../../../redux/slices/board/boardThunk.js';

const BestLikeList = () => {
  const dispatch = useDispatch();
  const bestLikePosts = useSelector((state) => state.board.bestLikePostList);

  useEffect(() => {
    dispatch(fetchBestLikePostList());
  }, [dispatch]);

  return (
    <>
      <SizedBox height={30} />
      <Title titleText={'실시간 인기글'} />
      {bestLikePosts.map((bestLikePost) => (
        <LikeListItem key={bestLikePost.id} bestLikePost={bestLikePost} />
      ))}
      <SizedBox height={150} />
    </>
  );
};

export default BestLikeList;
