import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function RegisterPage({ onNavigate }) {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(loginInput, password, email)) {
      onNavigate('menu');
    }
  };

  return (
    <div className="register-page">
      <div className="register__container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p>
          Уже есть аккаунт? <button onClick={() => onNavigate('login')}>Войти</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
