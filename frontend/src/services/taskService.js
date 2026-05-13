const STORAGE_KEY = 'mis_tareas_v1';
const USERS_KEY = 'app_users';

export const taskService = {
  get: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  save: (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  registerUser: (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
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
  },

  validateEmail: (email) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return users.find(u => u.email === email);
  },

    upPass: (email, newPassword) => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const updateUsers = users.map(u => u.email === email ? {...u, password: newPassword} : u);
      localStorage.setItem(USERS_KEY, JSON.stringify(updateUsers));
      return {success: true, message: 'Contraseña actualizada'}
    }
};