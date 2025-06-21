import { authenticatedFetch } from '../api.js';

export const tokenValidateApi = async (token) => {
  const response = await authenticatedFetch(
    'api/auth/verifiedToken',
    { method: 'GET' },
    token,
  );

  if (!response.ok) {
    throw new Error('토큰이 유효하지 않습니다.');
  }

  return await response.json();
};
