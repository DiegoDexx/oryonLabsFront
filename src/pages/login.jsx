/**LOGIN COMPONENT */

import { useState } from 'react';
import { useDispatch } from 'react-redux';  
import { usePost } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom'; // Importa Navigate para redirigir
import { loginUser } from '../actions/authActions'; // Importa la acción de login
import {Link} from 'react-router-dom';
import logo from '../assets/img/logo_blue2.png';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [onLoginSuccess, setOnLoginSuccess] = useState(false);
    const {  loading, post } = usePost();
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Para redirigir después de cerrar sesión

    const dispatch = useDispatch();

    const handleLoginSuccess = () => {
        setOnLoginSuccess(true);
    }

  const handleLogin = async () => {
    const loginUrl = 'https://oryonlabsdb-production.up.railway.app/api/login';
    const loginData = { email, password };

    try {
      const response = await post(loginUrl, loginData);

      if (response.data) {
        console.log('Login successful:', response.data);

        const { access_token, user } = response.data;

        // Guardar en Redux + localStorage
        dispatch(loginUser(user, access_token));

        // Redirigir según rol
        if (user.roles.includes('admin') || user.roles.includes('Administrador')) {
          navigate('/adminpanel');
        } else {
          navigate('/home');
        }

        onClose();
      }
    } catch (error) {
      console.error('Error response:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error inesperado. Intenta de nuevo más tarde.');
      }
    }
  };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div className='modal-overlay'>
            <style>
                {`
                    .error-message {
                        color: red;
                        margin-top: 5px;
                        font-size: 12px;
                    }

                    label {
                        color: black;
                        font-size: 12px;
                    }

                    .success-message {
                        color: green;
                        font-size: 16px;
                    }

                    .close-button {
                        margin-top: 10px;
                    }
                `}
            </style>
            <div className="modal-inner">
                <div className="modal-top">
                    <div className="logo">
                        <img src={logo} alt="Logo" className="logo" />     
                        <h2>Bienvenido de nuevo!</h2>
                    </div>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>
                <div className="modal-content">
                    <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(handleLoginSuccess); }}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {loading && <div className="loading-message">Loading...</div>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {onLoginSuccess && <div className="success-message">Login successful!</div>}
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <label className='register-link' onClick={onClose}>¿No tienes cuenta? <Link to="/register">Registrate</Link></label>
                </div>
            </div>
        </div>
    );
}

// Login.propTypes = {
//     isModalClosed: PropTypes.bool.isRequired,
//     setisModalClosed: PropTypes.func.isRequired,
// };

export default Login;