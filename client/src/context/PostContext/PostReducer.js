// const PostReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_TIMELINE_POSTS_START':
//       return {
//         ...state,
//         timelinePostsFetching: true,
//       };
//     case 'FETCH_TIMELINE_POSTS_SUCCESS':
//       return {
//         ...state,
//         timelinePostsFetching: false,
//         timelinePosts: [action.payload],
//       };
//     case 'FETCH_TIMELINE_POSTS_FAILURE':
//       return {
//         ...state,
//         timelinePostsFetching: false,
//         timelinePostsrror: true,
//       };
//     case 'FETCH_SINGLE_POST_START':
//       return {
//         ...state,
//         singlePostsFetching: true,
//       };
//     case 'FETCH_SINGLE_POST_SUCCESS':
//       return {
//         ...state,
//         singlePostsFetching: false,
//         singlePosts: [action.payload],
//       };
//     case 'FETCH_SINGLE_POST_FAILURE':
//       return {
//         ...state,
//         singlePostsFetching: false,
//         singlePostsrror: true,
//       };
//     default:
//       return state;
//   }
// };

// export default PostReducer;
