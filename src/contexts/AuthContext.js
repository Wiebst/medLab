import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (loginInput, password) => {
    if (!loginInput || !password) {
      return { success: false, error: 'Заполните все поля' };
    }

    const userData = {
      login: loginInput,
      role: 'user',
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const register = (loginInput, password, email) => {
    if (!loginInput || !password || !email) {
      return { success: false, error: 'Заполните все поля' };
    }

    if (!email.includes('@')) {
      return { success: false, error: 'Введите корректный email' };
    }

    const userData = {
      login: loginInput,
      email: email,
      role: 'user',
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}
