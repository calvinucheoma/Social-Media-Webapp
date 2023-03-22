import './Register.css';
import { useRef } from 'react'; //prevents re-rendering of components anytime we enter a chracter in the input box unlike useState hook
import { useNavigate } from 'react-router-dom';
import { registerCall } from '../../apiCalls';
// import { AuthContext } from '../../context/AuthContext';
// import { CircularProgress } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();

  const username = useRef();

  const email = useRef();

  const password = useRef();

  const passwordAgain = useRef();

  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity('Passwords do not match');
      password.current.reportValidity();
    } else {
      password.current.setCustomValidity(''); // reset the custom validity
      const userCredentials = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      registerCall(userCredentials, navigateToLogin);
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Chuksocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Chuksocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              className="registerInput"
              ref={username}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="registerInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              required
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              className="registerInput"
              required
              minLength="6"
              ref={passwordAgain}
            />
            <button
              type="submit"
              className="registerButton"
              // disabled={isFetching}
            >
              {/* {isFetching ? (
                <CircularProgress sx={{ color: 'white' }} size="20px" />
              ) : ( */}
              Sign Up
              {/* )} */}
            </button>
            <button
              type="button"
              className="registerRegisterButton"
              onClick={goToLoginPage}
              // disabled={isFetching}
            >
              {/* {isFetching ? (
                <CircularProgress sx={{ color: 'white' }} size="20px" />
              ) : ( */}
              Log Into Account
              {/* )} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
