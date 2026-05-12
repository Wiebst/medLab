import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function LoginPage({ onNavigate }) {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(loginInput, password)) {
      onNavigate('menu');
    }
  };

  return (
    <div className="login-page">
      <div className="login__container">
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Войти</button>
        </form>
        <p>
          Нет аккаунта? <button onClick={() => onNavigate('register')}>Зарегистрироваться</button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
