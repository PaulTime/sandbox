export const fetchSignupRequest = () => async ({ username, phone, email, password }) => {
  return await window.fetch('/auth-service/registration', {
    method: 'POST',
    credentials: 'include',
    body: {
      username,
      phone,
      email,
      password,
    }
  });
};