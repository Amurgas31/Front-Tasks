import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const context = useContext(TaskContext);

  // Validación de seguridad: si el contexto no existe, avisamos
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }

  
  // Extraemos TODO lo que el Contexto ofrece
  const { 
    tasks, 
    user, 
    login, 
    logout, 
    saveTask, 
    deleteTask, 
    setEditingTask, 
    editingTask 
  } = context;

  // Lógica de agregar (Create del CRUD)
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };


  return {
    tasks,
    user,
    login,
    logout,
    addTask,
    deleteTask,
    setEditingTask,
    editingTask
  };
};