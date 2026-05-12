import { useState } from 'react';

function TestsOrdersPage() {
  const [patients, setPatients] = useState([
    { id: 1, fullName: 'Иванов Иван Иванович' },
    { id: 2, fullName: 'Петрова Мария Сергеевна' },
  ]);
  const [orders, setOrders] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [analysisName, setAnalysisName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [selectedFilterPatient, setSelectedFilterPatient] = useState('');

  const addOrder = () => {
    if (!selectedPatientId || !analysisName || !orderDate) return;
    const patient = patients.find((p) => p.id === parseInt(selectedPatientId));
    setOrders([
      ...orders,
      {
        id: Date.now(),
        patientId: parseInt(selectedPatientId),
        patientName: patient.fullName,
        analysisName,
        date: orderDate,
      },
    ]);
    setSelectedPatientId('');
    setAnalysisName('');
    setOrderDate('');
  };

  const filteredOrders = selectedFilterPatient
    ? orders.filter((o) => o.patientId === parseInt(selectedFilterPatient))
    : orders;

  return (
    <div className="tests-orders-page">
      <h2>Назначение анализов</h2>

      <div className="form-section">
        <h3>Новое назначение</h3>
        <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
          <option value="">Выберите пациента</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Название анализа"
          value={analysisName}
          onChange={(e) => setAnalysisName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Дата"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
        <button onClick={addOrder}>Назначить анализ</button>
      </div>

      <div className="list-section">
        <h3>Список назначений</h3>
        <select
          value={selectedFilterPatient}
          onChange={(e) => setSelectedFilterPatient(e.target.value)}
        >
          <option value="">Все пациенты</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>

        <table className="data-table">
          <thead>
            <tr>
              <th>Пациент</th>
              <th>Анализ</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.patientName}</td>
                <td>{o.analysisName}</td>
                <td>{o.date}</td>
                <td>
                  <button onClick={() => setOrders(orders.filter((order) => order.id !== o.id))}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestsOrdersPage;
