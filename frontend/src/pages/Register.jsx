import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { taskService } from '../services/taskService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = taskService.registerUser(formData);
    
    if (result.success) {
      setShowSuccess(true);
      setError('');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative">
        
        {/* Modal de que se creo la cuenta */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center rounded-xl p-6 text-center border-2 border-indigo-500">
            <h3 className="text-xl font-bold text-gray-800">¡Cuenta Creada!</h3>
            <p className="text-gray-600 mb-6">Tu registro se completó con éxito. Ya puedes iniciar sesión.</p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
            >
              Ir al Login
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Crear Cuenta</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 rounded text-xs mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Nombre Completo" required
            className="w-full p-3 border rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Correo Institucional" required
            className="w-full p-3 border rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Contraseña (mín. 6 caracteres)" required minLength={6}
            className="w-full p-3 border rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 shadow-md">
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link to="/" className="text-indigo-600 font-bold hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}