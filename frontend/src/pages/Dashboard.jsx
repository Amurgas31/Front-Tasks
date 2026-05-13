import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Button } from '../components/Button.jsx';
import { Modal } from '../components/Modal.jsx';

export const Dashboard = () => {
  const { tasks, saveTask, deleteTask, logout, setEditingTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const [newTask, setNewTask] = useState({
    title: '', subject: '', description: '', priority: 'Baja', dueDate: '', status: 'Pendiente'
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTask);
    setIsModalOpen(false);
    setNewTask({ title: '', subject: '', description: '', priority: 'Baja', dueDate: '', status: 'Pendiente' });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">Mis Pendientes</h1>
          <p className="text-sm text-gray-500 font-medium">Gestión Académica Profesional</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}>Nueva Tarea +</Button>
          <Button variant="outline" onClick={logout}>Salir</Button>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">Tarea / Materia</th>
                <th className="p-4 font-bold hidden md:table-cell">Entrega</th>
                <th className="p-4 font-bold text-center">Prioridad</th>
                <th className="p-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{task.title}</div>
                    <div className="text-xs text-indigo-500 font-semibold">{task.subject}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell font-medium">
                    {task.dueDate}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${task.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                      task.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600'
                      }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => {
                        setEditingTask(task); 
                        setIsModalOpen(true); 
                      }} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">Editar</button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400 hover:text-red-600 text-sm font-bold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nueva Actividad">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Información Básica</label>
            <input
              type="text" placeholder="Título de la tarea" required
              className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>

          <input
            type="text" placeholder="Materia (Ej: Programación)" required
            className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
          />

          <textarea
            placeholder="Descripción de la actividad..." required
            className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px]"
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Fecha Límite</label>
              <input
                type="date" required
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Prioridad</label>
              <select
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full py-3 shadow-lg shadow-indigo-200">
            Guardar Tarea en el Sistema
          </Button>
        </form>
      </Modal>
    </div>
  );
};