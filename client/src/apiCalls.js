import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const loginURL = 'auth/login';

const registerURL = 'auth/register';

const createPostURL = 'posts';

const uploadImageURL = 'posts/uploads';

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axiosInstance.post(loginURL, userCredentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    console.log(response);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};

export const registerCall = async (userCredentials, navigateToLogin) => {
  try {
    const response = await axiosInstance.post(registerURL, userCredentials);
    console.log(response);
    if (navigateToLogin) navigateToLogin(); // call the callback if it's provided
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = async (postId, username) => {
  try {
    const response = await axiosInstance.put(`posts/${postId}/like`, username);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (postDetails) => {
  try {
    const response = axiosInstance.post(createPostURL, postDetails);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(uploadImageURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response);
    const data = response.data;
    const image = data.image.src;
    // console.log(image);
    return image;
  } catch (error) {
    console.log(error.message);
  }
};

export const getFriends = async (friendUsername, setFriends) => {
  try {
    const response = await axiosInstance.get(`users/friends/${friendUsername}`);
    const data = response.data;
    // console.log(data);
    setFriends(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const followOrUnfollowUser = async (
  isFollowed,
  accountUsername,
  currentUser,
  setIsFollowed,
  setLoading,
  dispatch
) => {
  try {
    setLoading(true);
    if (isFollowed) {
      await axiosInstance.put(`users/${accountUsername}/unfollow`, {
        username: currentUser?.username,
      });
      // dispatch({ type: 'UNFOLLOW', payload: accountUsername });
    } else {
      await axiosInstance.put(`users/${accountUsername}/follow`, {
        username: currentUser?.username,
      });
      // dispatch({ type: 'FOLLOW', payload: accountUsername });
    }
    setIsFollowed(!isFollowed);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
