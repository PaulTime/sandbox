export const fetchSignupRequest = ({ username, phone, email, password }) => async () => {
  return await window.fetch('/auth-service/registration', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      phone,
      email,
      password,
    })
  });
};