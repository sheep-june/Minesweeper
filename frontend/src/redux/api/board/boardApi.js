import { authenticatedFetch, publicFetch } from '../api.js';
import { Navigate } from 'react-router-dom';

export const fetchTotalBoardListApi = async () => {
  const response = await publicFetch('/api/board/fetchRegionBoardList', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchBoardPostListApi = async (boardId) => {
  const response = await publicFetch(
    '/api/board/fetchBoardPostList?boardId=' + boardId,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchPostDetailApi = async ({ postId, memberId }) => {
  const response = await publicFetch(
    `/api/board/fetchPostDetail?postId=${postId}&memberId=${memberId}`,
    { method: 'GET' },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const createBoardPostApi = async ({ formData, token }) => {
  const response = await authenticatedFetch(
    '/api/board/createBoardPost',
    { method: 'POST', body: JSON.stringify(formData) },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.message.includes('JWT expired')) {
      // JWT 만료 에러를 식별하여 특정 에러를 던집니다.
      throw new Error('JWT_EXPIRED');
    }

    throw new Error(
      errorData.message || '게시물 업로드 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const modifyBoardPostApi = async ({ formData, token }) => {
  const response = await authenticatedFetch(
    '/api/board/modifyBoardPost',
    { method: 'POST', body: JSON.stringify(formData) },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.message.includes('JWT expired')) {
      // JWT 만료 에러를 식별하여 특정 에러를 던집니다.
      throw new Error('JWT_EXPIRED');
    }

    throw new Error(
      errorData.message || '게시물 업로드 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchBestRegionBoardListApi = async () => {
  const response = await publicFetch('/api/board/fetchBestRegionBoardList', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchBestLikePostListApi = async () => {
  const response = await publicFetch('/api/board/fetchBestLikePostList', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const increasePostLikeApi = async ({ postId, memberId, token }) => {
  const response = await authenticatedFetch(
    `/api/board/increasePostLike?postId=${postId}&memberId=${memberId}`,
    { method: 'GET' },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.message.includes('JWT expired')) {
      // JWT 만료 에러를 식별하여 특정 에러를 던집니다.
      throw new Error('JWT_EXPIRED');
    }

    throw new Error(
      errorData.message || '게시물 업로드 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchNoticeBoardListApi = async () => {
  const response = await publicFetch('/api/board/fetchNoticeBoardList', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const searchPostApi = async ({ keyword }) => {
  const response = await publicFetch(
    '/api/board/searchPost?keyword=' + keyword,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const deletePostApi = async (token, postId) => {
  const response = await authenticatedFetch(
    '/api/board/deletePost?deletePostId=' + postId,
    { method: 'DELETE' },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '게시글 삭제 중 오류가 발생했습니다.');
  }

  return response.json();
};
