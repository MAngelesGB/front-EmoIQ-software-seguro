import { useState } from 'react';
import backgroundImg from '../../assets/background.png';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const userCredentials = await login(email, password);
      console.log(userCredentials);
    } catch (err) {
      console.error(err.message)
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
          <div className="recaptcha">
            <div className="g-recaptcha" data-sitekey="your-site-key"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
