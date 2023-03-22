// import axios from 'axios';
// import { useEffect } from 'react';
// import { createContext, useReducer } from 'react';
// import PostReducer from './PostReducer';

// const INITIAL_STATE = {
//   timelinePosts: [],
//   singlePosts: [],
//   userProfilePosts: [],
//   timelinePostsFetching: false,
//   timelinePostsrror: false,
//   singlePostsFetching: false,
//   singlePostsrror: false,
// };

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_URL,
// });

// const timelinePostsURL = `posts/timeline/${user.username}`;

// export const PostContext = createContext(INITIAL_STATE);

// export const PostContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

//     const fetchTimelinePosts = async (url) => {
//       dispatch({ type: 'FETCH_TIMELINE_POSTS_START' });
//       try {
//         const response = await axios.get(url);
//         const posts = response.data;
//         dispatch({ type: 'FETCH_TIMELINE_POSTS_SUCCESS', payload: posts });
//       } catch (error) {
//         dispatch({ type: 'FETCH_TIMELINE_POSTS_FAILURE' });
//       }
//     };

//         const fetchSinglePost = async (url) => {
//           dispatch({ type: 'FETCH_SINGLE_POST_START' });
//           try {
//             const response = await axios.get(url);
//             const posts = response.data;
//             dispatch({ type: 'FETCH_SINGLE_POST_SUCCESS', payload: posts });
//           } catch (error) {
//             dispatch({ type: 'FETCH_SINGLE_POST_FAILURE' });
//           }
//         };

//       useEffect(() => {
//         fetchTimelinePosts(timelinePostsURL);
//       }, []);

//   return (
//     <PostContext.Provider
//       value={{
//         ...state,
//         dispatch,
//       }}
//     >
//       {children}
//     </PostContext.Provider>
//   );
// };
