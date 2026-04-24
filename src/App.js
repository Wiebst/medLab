import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientsPage from './pages/PatientsPage';
import TestsOrdersPage from './pages/TestsOrdersPage';
import TestsResultsPage from './pages/TestsResultsPage';
import TreatmentPage from './pages/TreatmentPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('patients');
  const { user, logout } = useAuth();

  if (!user) {
    if (currentPage === 'register') {
      return <RegisterPage onNavigate={setCurrentPage} />;
    }
    return <LoginPage onNavigate={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'patients':
        return <PatientsPage />;
      case 'tests-orders':
        return <TestsOrdersPage />;
      case 'tests-results':
        return <TestsResultsPage />;
      case 'treatment':
        return <TreatmentPage />;
      default:
        return <PatientsPage />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} user={user} onLogout={logout} />
      <main className="main-content">{renderPage()}</main>
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
