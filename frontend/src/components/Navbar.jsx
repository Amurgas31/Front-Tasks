import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Usamos Montserrat indirectamente por la config de index.css */}
        <h1 className="text-xl font-bold">EduTasks</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Tareas</Link>
          <Link to="/" className="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium">Salir</Link>
        </div>
      </div>
    </nav>
  );
};