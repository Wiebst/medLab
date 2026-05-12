function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h4>Контакты</h4>
          <p>Email: info@medlab.ru</p>
          <p>Телефон: +7 (666) 555-44-33</p>
          <p>Адрес: г. Калининград, ул. Пушкина, д. Колотушкина</p>
        </div>
        <div className="footer__section">
          <h4>Все права защищены.</h4>
          <p>© 2026 Медицинская лаборатория</p>
        </div>
        <div className="footer__section">
          <h4>Режим работы</h4>
          <p>Пн-Пт: 8:00 - 20:00</p>
          <p>Сб: 9:00 - 15:00</p>
          <p>Вс: выходной</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
