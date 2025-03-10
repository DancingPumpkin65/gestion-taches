import React from 'react';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const TaskListContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
`;

const TaskListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary + '30'};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptyMessage = styled.p`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text + '80'};
  text-align: center;
`;

const TaskList = ({ tasks, onToggleCompletion, onDeleteTask, onEditTask, onShowDetails }) => {
  return (
    <TaskListContainer>
      <TaskListTitle>liste tache</TaskListTitle>
      {tasks.length === 0 ? (
        <EmptyMessage>0 tache</EmptyMessage>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggleCompletion={onToggleCompletion}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onShowDetails={onShowDetails}
          />
        ))
      )}
    </TaskListContainer>
  );
};

export default TaskList;
