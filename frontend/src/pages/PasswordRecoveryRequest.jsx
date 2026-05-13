import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Link } from "react-router";
import { taskService } from '../services/taskService';
import { useTasks } from '../hooks/useTasks.js';

export default function PasswordRecoveryRequest () {
  const [email, setEmail] = useState('');
  const {setEmailGlobal} = useTasks('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(TaskContext);
  const navigate = useNavigate();
  const code = "202605";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
        setError("Ingresa un correo válido");
        return;
      } 

    const existUser = taskService.validateEmail(email);

    if (existUser) {
        setShowSuccess(true);
        setEmailGlobal(email)
        setError('');
      } else {
        setError('Correo no encontrado. ¿Lo escribiste correctamente?');
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-sans">

        {/* Modal de OTP */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center rounded-xl p-6 text-center border-2 border-indigo-500">
            <h3 className="text-xl font-bold text-gray-800">Este es tu código OTP</h3>
            <p className="text-gray-600 mb-6">Tu código se envió con exito. Ingresalo correctamente al continuar: <strong>{code}</strong></p>
            <button 
              onClick={() => navigate('/requestRecoveryOTP')} 
              className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
            >
              Continuar
            </button>
          </div>
        )}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">Recuperar Contraseña</h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Escribe tu correo y te enviaremos un código para validar el cambio.</p>
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

        <Button type="submit" className="w-full py-3 shadow-lg shadow-indigo-100">
        Enviar código de recuperación
        </Button>

        <div className="flex mt-4 items-center justify-between text-sm text-gray-500">
        <Link to="/" className="text-indigo-600 text-start font-bold hover:underline transition-all">
          Volver a login
          </Link>
          <span className="text-xs text-end text-gray-500">Código válido por 5 minutos</span>
        </div>
      </form>
    </div>
  );
};