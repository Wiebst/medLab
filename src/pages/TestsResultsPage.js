import { useState } from 'react';

function TestsResultsPage() {
  const [patients, setPatients] = useState([
    { id: 1, fullName: 'Иванов Иван Иванович' },
    { id: 2, fullName: 'Петрова Мария Сергеевна' },
  ]);
  const [results, setResults] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [analysisName, setAnalysisName] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [comment, setComment] = useState('');
  const [selectedFilterPatient, setSelectedFilterPatient] = useState('');

  const addResult = () => {
    if (!selectedPatientId || !analysisName || !resultValue) return;
    const patient = patients.find((p) => p.id === parseInt(selectedPatientId));
    setResults([
      ...results,
      {
        id: Date.now(),
        patientId: parseInt(selectedPatientId),
        patientName: patient.fullName,
        analysisName,
        result: resultValue,
        comment,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setSelectedPatientId('');
    setAnalysisName('');
    setResultValue('');
    setComment('');
  };

  const filteredResults = selectedFilterPatient
    ? results.filter((r) => r.patientId === parseInt(selectedFilterPatient))
    : results;

  return (
    <div className="tests-results-page">
      <h2>Результаты анализов</h2>

      <div className="form-section">
        <h3>Добавить результат</h3>
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
          type="text"
          placeholder="Результат"
          value={resultValue}
          onChange={(e) => setResultValue(e.target.value)}
        />
        <textarea
          placeholder="Комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addResult}>Сохранить результат</button>
      </div>

      <div className="list-section">
        <h3>Список результатов</h3>
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
              <th>Результат</th>
              <th>Комментарий</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((r) => (
              <tr key={r.id}>
                <td>{r.patientName}</td>
                <td>{r.analysisName}</td>
                <td>{r.result}</td>
                <td>{r.comment}</td>
                <td>{r.date}</td>
                <td>
                  <button onClick={() => setResults(results.filter((res) => res.id !== r.id))}>
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

export default TestsResultsPage;
