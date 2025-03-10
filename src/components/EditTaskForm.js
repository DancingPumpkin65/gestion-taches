import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: left;
`;

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary + '30'};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.danger + '15'};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  transition: border ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '30'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  transition: border ${({ theme }) => theme.transition};
  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '30'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  min-height: 100px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '30'};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: 500;
  transition: background ${({ theme }) => theme.transition};
  flex: 1;

  &:focus {
    outline: none;
  }
`;

const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [originalId, setOriginalId] = useState('');

  useEffect(() => {
    if (task) {
      setTaskId(task.id);
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.completed ? 'completed' : 'active');
      setCreationDate(task.creationDate);
      setOriginalId(task.originalId || task.id);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('obligatoire');
      return;
    }
    
    if (!taskId.trim()) {
      setError('id obligatoire');
      return;
    }
    
    onSave({
      id: taskId,
      title,
      description,
      completed: status === 'completed',
      creationDate,
      originalId
    });
  };

  return (
    <FormContainer>
      <FormTitle>modifier tache</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="editTaskId">ID:</Label>
            <Input 
              type="text" 
              id="editTaskId"
              value={taskId} 
              onChange={(e) => setTaskId(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="editStatus">status:</Label>
            <Select
              id="editStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">non termine</option>
              <option value="completed">temine</option>
            </Select>
          </FormGroup>
        </FormGrid>
        <FormGroup>
          <Label htmlFor="editTitle">titre:</Label>
          <Input 
            type="text" 
            id="editTitle"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="editDescription">description:</Label>
          <TextArea 
            id="editDescription"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <ButtonsContainer>
          <SaveButton type="submit">
            valider
          </SaveButton>
          <CancelButton type="button" onClick={onCancel}>
            annuler
          </CancelButton>
        </ButtonsContainer>
      </form>
    </FormContainer>
  );
};

export default EditTaskForm;
