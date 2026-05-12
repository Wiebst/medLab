import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientsPage from './pages/PatientsPage';
import TestsOrdersPage from './pages/TestsOrdersPage';
import TestsResultsPage from './pages/TestsResultsPage';
import TreatmentPage from './pages/TreatmentPage';
import patientsService from './services/patients';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      loadPatients();
    }
  }, [user]);

  const loadPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.getAllPatients();
      if (result.success) {
        setPatients(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Ошибка загрузки пациентов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patientData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.createPatient(patientData);
      if (result.success) {
        await loadPatients();
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Ошибка добавления пациента');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.deletePatient(id);
      if (result.success) {
        await loadPatients();
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Ошибка удаления пациента');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.updatePatient(id, updateData);
      if (result.success) {
        await loadPatients();
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Ошибка обновления пациента');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.searchPatients(query);
      if (result.success) {
        setPatients(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Ошибка поиска пациентов');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    if (currentPage === 'register') {
      return <RegisterPage onNavigate={setCurrentPage} />;
    }
    return <LoginPage onNavigate={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'patients':
        return (
          <PatientsPage
            patients={patients}
            onAddPatient={addPatient}
            onDeletePatient={deletePatient}
            onUpdatePatient={updatePatient}
            onSearchPatients={searchPatients}
            loading={loading}
            error={error}
          />
        );
      case 'tests-orders':
        return <TestsOrdersPage patients={patients} />;
      case 'tests-results':
        return <TestsResultsPage patients={patients} />;
      case 'treatment':
        return <TreatmentPage patients={patients} />;
      default:
        return (
          <PatientsPage
            patients={patients}
            onAddPatient={addPatient}
            onDeletePatient={deletePatient}
            onUpdatePatient={updatePatient}
            onSearchPatients={searchPatients}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} user={user} onLogout={logout} />
      <main className="main-content">
        {loading && <div className="loading-overlay">Загрузка...</div>}
        {error && <div className="error-message">{error}</div>}
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
