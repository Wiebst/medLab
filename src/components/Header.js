function Header({ currentPage, onNavigate, user, onLogout }) {
  const menuItems = [
    { id: 'patients', label: 'Пациенты' },
    { id: 'tests-orders', label: 'Назначения' },
    { id: 'tests-results', label: 'Результаты' },
    { id: 'treatment', label: 'Лечение' },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <h1>МедЛаб</h1>
      </div>
      <nav className="header__nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`header__nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header__user">
        <span>{user?.login || user?.email}</span>
        <button onClick={onLogout} className="header__logout">
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
