import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Button } from './Button';

export const Modal = ({ isOpen, onClose }) => {
  const { editingTask, saveTask } = useContext(TaskContext);
  
  const [formData, setFormData] = useState({
    title: '', subject: '', description: '', priority: 'Baja', dueDate: '', status: 'Pendiente'
  });

  // Este efecto rellena el formulario cuando das clic en "Editar"
  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({ title: '', subject: '', description: '', priority: 'Baja', dueDate: '', status: 'Pendiente' });
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTask(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900">
            {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Título de la Actividad</label>
            <input 
              type="text" required
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Ej: Estudiar para examen"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Materia</label>
              <input 
                type="text" required
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ej: Programación"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Prioridad</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Descripción</label>
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
              placeholder="¿De qué trata la tarea?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Fecha de Entrega</label>
            <input 
              type="date" required
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <Button type="submit" className="flex-1 shadow-lg shadow-indigo-100">
              {editingTask ? 'Actualizar' : 'Crear Tarea'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};