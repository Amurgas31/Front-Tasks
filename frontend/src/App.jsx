import { Routes, Route, Navigate } from 'react-router';
import { useTasks } from './hooks/useTasks'; // Usamos nuestro hook
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  const { user } = useTasks();
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
        {/* Simulación de protección de rutas (Punto 30 de la rúbrica) */}
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