import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Link } from "react-router";
import { taskService } from '../services/taskService';

// login
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validación de formato (Rúbrica Punto 5)
    if (!email.includes('@') || password.length < 6) {
      setError('Email inválido o contraseña muy corta (mín. 6)');
      return;
    }

    // 2. Validación con los datos guardados en LocalStorage a través del Service
    const registeredUser = taskService.validateUser(email, password);

    if (registeredUser) {
      // Si el usuario existe y la contraseña coincide
      login(email); 
      navigate('/dashboard'); 
    } else {
      // Si no coinciden los datos
      setError('Correo o contraseña incorrectos. ¿Ya te registraste?');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">EduTasks</h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Ingresa a tu panel de control</p>
        </div>

        {error && (
          <div className="text-red-500 text-xs mb-6 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
             {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Correo Electrónico</label>
          <input
            type="email"
            required
            className="w-full border border-gray-200 p-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="estudiante@ejemplo.com"
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Contraseña</label>
          <input
            type="password"
            required
            className="w-full border border-gray-200 p-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full py-3 shadow-lg shadow-indigo-100">
          Entrar al Sistema
        </Button>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline transition-all">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};