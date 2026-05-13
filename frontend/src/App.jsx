import { Routes, Route, Navigate } from 'react-router';
import { useTasks } from './hooks/useTasks';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import Register from './pages/Register';
import RecoveryPass from './pages/PasswordRecoveryRequest'
import RecoveryPassOTP from './pages/PasswordRecoveryOTP'

function App() {
  const { user } = useTasks();
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/requestRecovery" element={<RecoveryPass />} />

        <Route path="/requestRecoveryOTP" element={<RecoveryPassOTP />} />
        
        {/* protección de rutas */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;