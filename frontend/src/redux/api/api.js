/**
 * 인증이 필요한 API 요청을 위한 헬퍼 함수
 * @param {string} url - API 엔드포인트
 * @param {object} options - fetch 옵션
 * @returns {Promise} - fetch 응답
 */
export const authenticatedFetch = (url, options = {}, token) => {
  const headers = options.headers || {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 요청 본문이 FormData인지 확인
  const isFormData = options.body instanceof FormData;

  // FormData가 아니면 Content-Type 설정
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
    },
  });
};

/**
 * 인증이 필요하지 않은 API 요청을 위한 헬퍼 함수
 * @param {string} url - API 엔드포인트
 * @param {object} options - fetch 옵션
 * @returns {Promise} - fetch 응답
 */
export const publicFetch = (url, options = {}) => {
  const headers = options.headers || {};

  // 요청 본문이 FormData인지 확인
  const isFormData = options.body instanceof FormData;

  // FormData가 아니면 Content-Type 설정
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
    },
  });
};
