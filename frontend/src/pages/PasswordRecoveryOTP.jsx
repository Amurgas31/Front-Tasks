import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Link } from "react-router";
import { taskService } from '../services/taskService';
import { isStrongPassword } from "../lib/password-policy.js";
import { useTasks } from '../hooks/useTasks.js';

export default function PasswordRecoveryOTP () {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(""); // código OTP ingresado por el usuario
  const {emailGlobal} = useTasks();
  const [showSuccess, setShowSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // nueva contraseña a establecer
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmación de contraseña
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const code = "202605";

  const { login } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

      if (otpCode !== code) {
        setError("Código incorrecto. Ingresa el código OTP de 6 dígitos que se brindo.");
        return;
      } else if (!newPassword) {
        setError("Debes ingresar una nueva contraseña");
        return;
      } else if (!isStrongPassword(newPassword)) {
        setError("La contraseña debe incluir una letra mayúscula, una minúscula, un número y carácter especial. Contando con un mínimo de 8 caracteres.");
        return;
      } else if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      } 
      
      const result = taskService.upPass(emailGlobal, newPassword);

      if (result.success){
        setError("Las contraseñas no coinciden " + "email de la otra vista: " + emailGlobal + "contraseña: " + newPassword);
        setShowSuccess(true);
      setError('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-sans">

         {/* Modal de contraseña actualizada */}
         {showSuccess && (
          <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center rounded-xl p-6 text-center border-2 border-indigo-500">
            <h3 className="text-xl font-bold text-gray-800">¡Contraseña Actualizada!</h3>
            <p className="text-gray-600 mb-6">Tu contraseña fue actualizada con exito. Ya puedes iniciar sesión.</p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
            >
              Ir al Login
            </button>
          </div>
        )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">Validar recuperación</h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Ingresa el código de 6 dígitos y tu nueva contraseña.</p>
        </div>

        {error && (
          <div className="text-red-500 text-xs mb-6 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
             {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Código OTP</label>
          <input
            type="input"
            required
            className="w-full border border-gray-200 p-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder-gray-400"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="123456"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Nueva Contraseña</label>
          <input
            type="password"
            required
            className="w-full border border-gray-200 p-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Confirma Contraseña</label>
          <input
            type="password"
            required
            className="w-full border border-gray-200 p-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
          <p className="mt-2 text-xs text-gray-500">La confirmación debe coincidir exactamente con la clave nueva.</p>
        </div>

        <Button type="submit" className="w-full py-3 shadow-lg shadow-indigo-100">
        Validar y actualizar contraseña
        </Button>

        <div className="flex mt-4 items-center justify-between text-sm text-gray-500">
        <Link to="/requestRecovery" className="text-indigo-600 text-start font-bold hover:underline transition-all">
          Volver
          </Link>
          <Link to="#" className="text-indigo-600 text-start font-bold hover:underline transition-all">
          Reenviar código
          </Link>
        </div>
      </form>
    </div>
  );
};