import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TaskItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ completed, theme }) => 
    completed ? theme.colors.completed : theme.colors.white};
  transition: transform ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.boxShadow};

  &:hover {
    transform: translateY(-2px);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TaskTitle = styled.h3`
  margin-top: 0;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  font-weight: 600;
`;

const TaskIDLabel = styled.span`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text + '99'};
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const TaskDescription = styled.p`
  color: ${({ theme }) => theme.colors.text + '99'};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TaskMeta = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text + '80'};
  margin: ${({ theme }) => `${theme.spacing.xs} 0`};
`;

const TaskStatus = styled.p`
  font-weight: 500;
  color: ${({ completed, theme }) => 
    completed ? theme.colors.success : theme.colors.info};
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ completed, theme }) => 
    completed ? theme.colors.success + '20' : theme.colors.info + '20'};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const TaskActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transition};
  flex: 1;

  &:focus {
    outline: none;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.info};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.info + 'dd'};
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger + 'dd'};
  }
`;

const DetailsLink = styled(Link)`
  flex: 1;
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary + 'dd'};
  }
`;

const TaskItem = ({ task, onToggleCompletion, onDeleteTask, onEditTask }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TaskItemContainer completed={task.completed}>
      <TaskHeader>
        <TaskTitle completed={task.completed}>
          {task.title}
        </TaskTitle>
        <TaskIDLabel>id: {task.id}</TaskIDLabel>
      </TaskHeader>
      
      <TaskDescription>{task.description}</TaskDescription>
      
      <TaskMeta>
        date cration: {formatDate(task.creationDate)}
      </TaskMeta>
      
      <TaskStatus completed={task.completed}>
        {task.completed ? 'Terminée' : 'À faire'}
      </TaskStatus>
      
      <TaskActions>
        <EditButton onClick={() => onEditTask(task.id)}>
          modifier
        </EditButton>
        <DeleteButton onClick={() => onDeleteTask(task.id)}>
          supprimer
        </DeleteButton>
        <DetailsLink to={`/tache/${task.id}`}>
          details
        </DetailsLink>
      </TaskActions>
    </TaskItemContainer>
  );
};

export default TaskItem;
