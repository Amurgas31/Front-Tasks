const STORAGE_KEY = 'mis_tareas_v1';
const USERS_KEY = 'app_users';

export const taskService = {
  // --- Lógica de Tareas ---
  get: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  save: (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  // --- Lógica de Usuarios (Registro/Login) ---
  registerUser: (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    // Verificamos si el correo ya existe
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'El correo ya está registrado' };
    }
    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: '¡Registro exitoso!' };
  },

  validateUser: (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return users.find(u => u.email === email && u.password === password);
  }
};