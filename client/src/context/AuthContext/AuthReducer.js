const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'LOGIN_SUCCESS':
      // store user in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    // case 'LOGOUT':
    //   // remove user from localStorage
    //   localStorage.removeItem('user');
    //   return {
    //     ...state,
    //     user: null,
    //   };

    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
