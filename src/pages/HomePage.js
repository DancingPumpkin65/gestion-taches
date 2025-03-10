import React, { useState } from 'react';
import styled from 'styled-components';
import AddTaskForm from '../components/AddTaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import EditTaskForm from '../components/EditTaskForm';
import LoadingIndicator from '../components/LoadingIndicator';
import { exportTasksToJson } from '../services/TaskService';

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ToolbarButton = styled.button`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 0.85rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const HomePage = ({ 
  tasks, 
  isLoading, 
  onAddTask, 
  onDeleteTask, 
  onToggleCompletion, 
  onEditTask 
}) => {
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask({...task});
    }
  };

  const handleSaveEdit = (editedTask) => {
    onEditTask(editedTask);
    setEditingTask(null);
  };

  const handleExportTasks = () => {
    exportTasksToJson(tasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <Header>
      <AppTitle>gestionnaire taches</AppTitle>
      <ContentContainer>
        {isLoading ? (
          <LoadingIndicator message="charging..." />
        ) : editingTask ? (
          <EditTaskForm 
            task={editingTask} 
            onSave={handleSaveEdit} 
            onCancel={() => setEditingTask(null)} 
          />
        ) : (
          <>
            <ToolbarContainer>
              <ToolbarButton onClick={handleExportTasks}>
                export (json)
              </ToolbarButton>
            </ToolbarContainer>
            
            <AddTaskForm onAddTask={onAddTask} />
            <TaskFilter filter={filter} onFilterChange={setFilter} />
            <TaskList 
              tasks={filteredTasks} 
              onToggleCompletion={onToggleCompletion} 
              onDeleteTask={onDeleteTask}
              onEditTask={handleEditTask}
            />
          </>
        )}
      </ContentContainer>
    </Header>
  );
};

export default HomePage;
