import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react'; //prevents re-rendering of components anytime we enter a chracter in the input box unlike useState hook
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { CircularProgress } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const email = useRef();

  const password = useRef();

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const goToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chuksocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chuksocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              required
              minLength="6"
              placeholder="Password"
              className="loginInput"
              ref={password}
            />
            <button type="submit" className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress sx={{ color: 'white' }} size="20px" />
              ) : (
                'Log In'
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              type="button"
              className="loginRegisterButton"
              onClick={goToRegisterPage}
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress sx={{ color: 'white' }} size="20px" />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
