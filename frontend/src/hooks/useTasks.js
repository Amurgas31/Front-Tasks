import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }

  const { 
    tasks, 
    user, 
    login, 
    logout, 
    saveTask, 
    deleteTask, 
    setEditingTask,
    emailGlobal,
    setEmailGlobal,
    editingTask 
  } = context;

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
    emailGlobal,
    setEmailGlobal,
    editingTask
  };
};