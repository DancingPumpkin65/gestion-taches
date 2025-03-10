const API_URL = 'http://localhost:3001/api';

export const loadInitialTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const addSingleTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const updateSingleTask = async (task) => {
  try {
    const taskIdForUpdate = task.originalId || task.id;
    
    const response = await fetch(`${API_URL}/tasks/${taskIdForUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const deleteSingleTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (response.ok) {
      const tasks = await response.json();
      return tasks.find(task => task.id === taskId) || null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const exportTasksToJson = (tasks) => {
  try {
    const tasksData = { tasks };
    const blob = new Blob([JSON.stringify(tasksData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tache.json';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    return false;
  }
};
