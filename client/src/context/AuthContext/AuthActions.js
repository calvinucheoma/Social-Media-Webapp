export const LoginStart = (userCredentials) => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const Follow = (username) => ({
  type: 'FOLLOW',
  payload: username,
});

export const Unfollow = (username) => ({
  type: 'UNFOLLOW',
  payload: username,
});
