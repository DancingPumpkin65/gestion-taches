import { useState, useEffect } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import LoadingIndicator from './components/LoadingIndicator';
import TaskDetailsPage from './pages/TaskDetailsPage';
import HomePage from './pages/HomePage';
import { 
  loadInitialTasks, 
  addSingleTask, 
  updateSingleTask, 
  deleteSingleTask 
} from './services/TaskService';

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const fetchedTasks = await loadInitialTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    };
    
    fetchTasks();
  }, []);
  
  const generateId = () => {
    return Date.now().toString();
  };

  const addTask = async (id, title, description, completed = false) => {
    const newTask = {
      id: id || generateId(),
      title,
      description,
      completed,
      creationDate: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    await addSingleTask(newTask);
  };

  const toggleTaskCompletion = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) return;
    
    const updatedTask = { 
      ...taskToUpdate, 
      completed: !taskToUpdate.completed 
    };
    
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? updatedTask : task
    ));
    
    await updateSingleTask(updatedTask);
  };

  const deleteTask = async (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    await deleteSingleTask(taskId);
  };

  const editTask = async (editedTask) => {
    const originalId = editedTask.originalId || editedTask.id;
    
    setTasks(prevTasks => {
      const tasksWithoutOriginal = prevTasks.filter(task => task.id !== originalId);
      return [...tasksWithoutOriginal, editedTask];
    });
    
    await updateSingleTask(editedTask);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  tasks={tasks}
                  isLoading={isLoading}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                  onToggleCompletion={toggleTaskCompletion}
                  onEditTask={editTask}
                />
              } 
            />
            <Route 
              path="/tache/:taskId" 
              element={<TaskDetailsPage tasks={tasks} />} 
            />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
