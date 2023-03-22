import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const user = JSON.parse(localStorage.getItem('user'));

const INITIAL_STATE = {
  user: user ? user : null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
