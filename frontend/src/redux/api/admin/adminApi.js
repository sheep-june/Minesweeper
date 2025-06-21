import { authenticatedFetch, publicFetch } from '../api.js';

export const adminLoginApi = async (formData) => {
  const response = await fetch('/api/auth/adminLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // JSON 데이터 전송을 명시
    },
    body: JSON.stringify(formData), // formData를 JSON 문자열로 변환
  });

  if (!response.ok) {
    throw new Error('서버 응답이 올바르지 않습니다.');
  }

  return await response.json();
};

export const fetchManualAuthListApi = async (token) => {
  const response = await authenticatedFetch(
    '/api/admin/fetchManualAuthList',
    { method: 'GET' },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const updateManualAuthApi = async (token, data) => {
  const response = await authenticatedFetch(
    '/api/admin/updateManualAuth',
    { method: 'POST', body: JSON.stringify(data) },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '수동인증을 하는 중 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const fetchTotalMemberListApi = async (token) => {
  const response = await authenticatedFetch(
    '/api/admin/fetchTotalMemberList',
    { method: 'GET' },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || '유저 목록을 불러오는 중에 오류가 발생했습니다.',
    );
  }

  return response.json();
};

export const deleteMemberApi = async (token, memberId) => {
  const response = await authenticatedFetch(
    '/api/admin/deleteMember?memberId=' + memberId,
    { method: 'DELETE' },
    token,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '유저 삭제 중에 오류가 발생했습니다.');
  }

  return response.json();
};
