import { useState } from 'react';
import backgroundImg from '../../assets/background.png';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login({ openModal }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await login(email, password);
    } catch (err) {
      switch (err.code) {
        case 'auth/missing-password':
          openModal('El campo de contraseña es requerido');
          break;
        case 'auth/invalid-credential':
          openModal('Datos de acceso incorrectos. Verifica el email y contraseña');
          break;
        case 'auth/invalid-email':
          openModal('El correo es inválido');
          break;
        case 'auth/user-disabled':
          openModal('Esta cuenta ha sido desactivada.');
          break;
        default:
          openModal('Sucedió un error. Intenta nuevamente');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-side">
        <img src={backgroundImg} alt="Water lilies" className="background-image" />
      </div>
      <div className="form-side">
        <div className="login-form">
          <h1>EMOIQ</h1>
          <h2>INICIO DE SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="ej. kevin123@ejemplo.com"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <button type="submit">INICIAR SESIÓN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
