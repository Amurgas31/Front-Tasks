import { createContext, useState } from 'react';
import { initialTasks } from '../data/initialTasks';
import { useEffect } from 'react'; // Agrega useEffect
import { taskService } from '../services/taskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const login = (email) => setUser({ email, role: 'estudiante' });
  const logout = () => setUser(null);

  const [tasks, setTasks] = useState(() => {
    return taskService.get() || initialTasks;
  });

  useEffect(() => {
    taskService.save(tasks);
  }, [tasks]);

  // Función unificada para Guardar (Crea si es nueva, edita si ya existe)
  const saveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t));
    } else {
      setTasks([...tasks, { ...taskData, id: Date.now() }]);
    }
    setEditingTask(null);
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <TaskContext.Provider value={{
      user,
      tasks,
      editingTask,
      setEditingTask,
      saveTask,
      deleteTask,
      login,
      logout
    }}>
      {children}
    </TaskContext.Provider>
  );
};