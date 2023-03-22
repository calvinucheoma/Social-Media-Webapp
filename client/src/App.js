import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
