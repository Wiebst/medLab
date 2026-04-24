import { useState } from 'react';

function TreatmentPage() {
  const [patients, setPatients] = useState([
    { id: 1, fullName: 'Иванов Иван Иванович' },
    { id: 2, fullName: 'Петрова Мария Сергеевна' },
  ]);
  const [results, setResults] = useState([
    { patientId: 1, analysisName: 'Общий анализ крови', result: 'Норма', comment: '' },
    {
      patientId: 1,
      analysisName: 'Биохимия',
      result: 'Повышены печеночные пробы',
      comment: 'Требуется дообследование',
    },
    { patientId: 2, analysisName: 'Общий анализ крови', result: 'Понижен гемоглобин', comment: '' },
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [protocolText, setProtocolText] = useState('');

  const generateProtocol = () => {
    if (!selectedPatientId) return;
    const patient = patients.find((p) => p.id === parseInt(selectedPatientId));
    const patientResults = results.filter((r) => r.patientId === parseInt(selectedPatientId));

    let protocol = `ПРОТОКОЛ ИССЛЕДОВАНИЯ\n`;
    protocol += `=========================\n\n`;
    protocol += `Пациент: ${patient.fullName}\n`;
    protocol += `Дата формирования: ${new Date().toLocaleDateString()}\n\n`;
    protocol += `РЕЗУЛЬТАТЫ АНАЛИЗОВ:\n`;
    protocol += `-------------------------\n`;

    if (patientResults.length === 0) {
      protocol += `Нет результатов анализов для данного пациента.\n`;
    } else {
      patientResults.forEach((r) => {
        protocol += `\nАнализ: ${r.analysisName}\n`;
        protocol += `Результат: ${r.result}\n`;
        if (r.comment) protocol += `Комментарий: ${r.comment}\n`;
        protocol += `-------------------------\n`;
      });
    }

    protocol += `\nЗАКЛЮЧЕНИЕ:\n`;
    protocol += `Рекомендовано: дальнейшее наблюдение у лечащего врача.\n`;

    setProtocolText(protocol);
  };

  const printProtocol = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Протокол исследования</title></head>
        <body style="font-family: Arial; padding: 40px; white-space: pre-wrap;">${protocolText}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="treatment-page">
      <h2>Формирование протокола исследования</h2>

      <div className="protocol-controls">
        <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
          <option value="">Выберите пациента</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
        <button onClick={generateProtocol} disabled={!selectedPatientId}>
          Сформировать протокол
        </button>
        <button onClick={printProtocol} disabled={!protocolText}>
          Печать протокола
        </button>
      </div>

      <div className="protocol-output">
        <h3>Протокол:</h3>
        <textarea
          className="protocol-textarea"
          value={protocolText}
          onChange={(e) => setProtocolText(e.target.value)}
          placeholder="Здесь будет сформирован протокол..."
          rows={20}
        />
      </div>
    </div>
  );
}

export default TreatmentPage;
