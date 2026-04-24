import { useState } from 'react';

function PatientsPage() {
  const [patients, setPatients] = useState([
    { id: 1, fullName: 'Иванов Иван Иванович', birthDate: '1990-01-01', phone: '+7-999-123-4567' },
    {
      id: 2,
      fullName: 'Петрова Мария Сергеевна',
      birthDate: '1985-05-15',
      phone: '+7-999-234-5678',
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ fullName: '', birthDate: '', phone: '' });

  const addPatient = () => {
    if (!newPatient.fullName) return;
    setPatients([...patients, { ...newPatient, id: Date.now() }]);
    setNewPatient({ fullName: '', birthDate: '', phone: '' });
    setShowForm(false);
  };

  return (
    <div className="patients-page">
      <div className="page-header">
        <h2>Пациенты</h2>
        <button onClick={() => setShowForm(true)}>+ Добавить пациента</button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Новый пациент</h3>
            <input
              type="text"
              placeholder="ФИО"
              value={newPatient.fullName}
              onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
            />
            <input
              type="date"
              placeholder="Дата рождения"
              value={newPatient.birthDate}
              onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Номер телефона"
              value={newPatient.phone}
              onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={addPatient}>Сохранить</button>
              <button onClick={() => setShowForm(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Телефон</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.fullName}</td>
              <td>{p.birthDate}</td>
              <td>{p.phone}</td>
              <td>
                <button onClick={() => setPatients(patients.filter((pat) => pat.id !== p.id))}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsPage;
