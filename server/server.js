const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');   
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const tacheFilePath = path.join(__dirname, '../public/Tache.json');

const readTasks = () => {
  try {
    const jsonData = fs.readFileSync(tacheFilePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data.tasks || [];
  } catch (error) {
    return [];
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(tacheFilePath, JSON.stringify({ tasks }, null, 2));
    return true;
  } catch (error) {
    return false;
  }
};

app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = req.body;
  const success = writeTasks(tasks);
  res.json({ success });
});

app.post('/api/tasks/add', (req, res) => {
  const newTask = req.body;
  const tasks = readTasks();
  tasks.push(newTask);
  const success = writeTasks(tasks);
  res.json({ success, task: newTask });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const tasks = readTasks();
  
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    return res.status(404).json({ success: false });
  }
  
  tasks[index] = updatedTask;
  
  if (updatedTask.id !== taskId) {
    const duplicateIndex = tasks.findIndex((t, i) => i !== index && t.id === updatedTask.id);
    if (duplicateIndex !== -1) {
      return res.status(400).json({ success: false });
    }
  }
  
  const success = writeTasks(tasks);
  res.json({ success, task: updatedTask });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const tasks = readTasks();
  
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ success: false });
  }
  
  const success = writeTasks(filteredTasks);
  res.json({ success });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
