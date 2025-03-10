import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const TaskInfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TaskInfoLabel = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
`;

const TaskInfoContent = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text};
`;

const TaskStatus = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ completed, theme }) => 
    completed ? theme.colors.success + '20' : theme.colors.info + '20'};
  color: ${({ completed, theme }) => 
    completed ? theme.colors.success : theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 500;
`;

const TaskDetails = ({ task, onClose }) => {
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>details tache</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <TaskInfoSection>
          <TaskInfoLabel>id</TaskInfoLabel>
          <TaskInfoContent>{task.id}</TaskInfoContent>
        </TaskInfoSection>
        
        <TaskInfoSection>
          <TaskInfoLabel>titre</TaskInfoLabel>
          <TaskInfoContent>{task.title}</TaskInfoContent>
        </TaskInfoSection>
        
        <TaskInfoSection>
          <TaskInfoLabel>description</TaskInfoLabel>
          <TaskInfoContent>
            {task.description || <em>pas de description</em>}
          </TaskInfoContent>
        </TaskInfoSection>
        
        <TaskInfoSection>
          <TaskInfoLabel>status</TaskInfoLabel>
          <TaskStatus completed={task.completed}>
            {task.completed ? 'Terminée' : 'À faire'}
          </TaskStatus>
        </TaskInfoSection>
        
        <TaskInfoSection>
          <TaskInfoLabel>date creation</TaskInfoLabel>
          <TaskInfoContent>{formatDate(task.creationDate)}</TaskInfoContent>
        </TaskInfoSection>
      </ModalContainer>
    </Overlay>
  );
};

export default TaskDetails;
