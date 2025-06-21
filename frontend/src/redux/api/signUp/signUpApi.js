export const checkIdApi = async (id) => {
  const response = await fetch(
    `/api/auth/checkId?id=${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }

  const data = await response.json();
  return data;
};

export const signUpApi = async (formData) => {
  const requestFormData = new FormData();

  requestFormData.append("id", formData.id);
  requestFormData.append("password", formData.password);
  requestFormData.append("passwordConfirmation", formData.passwordConfirmation);
  requestFormData.append("email", formData.email);
  requestFormData.append("addressAuth", formData.addressAuth);
  requestFormData.append("idCardImage", formData.idCardImage);

  const response = await fetch("/api/auth/signUp", {
    method: "POST",
    body: requestFormData,
  });

  return response;
};
