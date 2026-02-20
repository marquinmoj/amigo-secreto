import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NumbersPage from './pages/NumbersPage';
import ContactsPage from './pages/ContactsPage';
import PipelinePage from './pages/PipelinePage';
import BotPage from './pages/BotPage';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="numbers" element={<NumbersPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="bot" element={<BotPage />} />
      </Route>
    </Routes>
  );
}
