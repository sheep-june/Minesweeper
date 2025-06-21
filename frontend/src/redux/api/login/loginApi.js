export const loginApi = async (formData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 명시
    },
    body: JSON.stringify(formData), // formData를 JSON 문자열로 변환
  });

  if (!response.ok) {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }

  return await response.json();
};
