import { useState } from 'react';

function PatientsPage({
  patients,
  onAddPatient,
  onDeletePatient,
  onUpdatePatient,
  onSearchPatients,
  loading,
  error,
}) {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPatient, setNewPatient] = useState({ fullName: '', birthDate: '', phone: '' });
  const [formError, setFormError] = useState('');

  const addPatient = async () => {
    if (!newPatient.fullName) {
      setFormError('Введите ФИО пациента');
      return;
    }
    if (!newPatient.birthDate) {
      setFormError('Введите дату рождения');
      return;
    }

    const result = await onAddPatient(newPatient);
    if (result.success) {
      setNewPatient({ fullName: '', birthDate: '', phone: '' });
      setShowForm(false);
      setFormError('');
    } else {
      setFormError(result.error);
    }
  };

  const updatePatient = async () => {
    if (!editingPatient.fullName) {
      setFormError('Введите ФИО пациента');
      return;
    }

    const result = await onUpdatePatient(editingPatient._id, {
      fullName: editingPatient.fullName,
      birthDate: editingPatient.birthDate,
      phone: editingPatient.phone,
    });

    if (result.success) {
      setShowEditForm(false);
      setEditingPatient(null);
      setFormError('');
    } else {
      setFormError(result.error);
    }
  };

  const deletePatient = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пациента?')) {
      await onDeletePatient(id);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await onSearchPatients(searchQuery);
    } else {
      // Если поиск пустой, загружаем всех пациентов
      await onSearchPatients('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="patients-page">
      <div className="page-header">
        <h2>Пациенты</h2>
        <button onClick={() => setShowForm(true)}>+ Добавить пациента</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Поиск по ФИО или телефону..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Найти</button>
        <button
          onClick={() => {
            setSearchQuery('');
            onSearchPatients('');
          }}
        >
          Сбросить
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Новый пациент</h3>
            {formError && <div className="error-message">{formError}</div>}
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
              <button onClick={addPatient} disabled={loading}>
                Сохранить
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormError('');
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && editingPatient && (
        <div className="modal">
          <div className="modal-content">
            <h3>Редактировать пациента</h3>
            {formError && <div className="error-message">{formError}</div>}
            <input
              type="text"
              placeholder="ФИО"
              value={editingPatient.fullName}
              onChange={(e) => setEditingPatient({ ...editingPatient, fullName: e.target.value })}
            />
            <input
              type="date"
              placeholder="Дата рождения"
              value={editingPatient.birthDate ? editingPatient.birthDate.split('T')[0] : ''}
              onChange={(e) => setEditingPatient({ ...editingPatient, birthDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Номер телефона"
              value={editingPatient.phone}
              onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={updatePatient} disabled={loading}>
                Сохранить
              </button>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingPatient(null);
                  setFormError('');
                }}
              >
                Отмена
              </button>
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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {loading ? 'Загрузка...' : 'Нет пациентов'}
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.fullName}</td>
                <td>{formatDate(patient.birthDate)}</td>
                <td>{patient.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingPatient(patient);
                      setShowEditForm(true);
                    }}
                  >
                    Редактировать
                  </button>
                  <button onClick={() => deletePatient(patient._id)}>Удалить</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsPage;
