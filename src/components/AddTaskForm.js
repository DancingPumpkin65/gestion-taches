import React, { useState } from 'react';
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

const SubmitButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: 500;
  transition: background ${({ theme }) => theme.transition};
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '40'};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
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

const AddTaskForm = ({ onAddTask }) => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('obligatoire');
      return;
    }
    
    onAddTask(taskId || generateId(), title, description, status === 'completed');
    setTaskId('');
    setTitle('');
    setDescription('');
    setStatus('active');
    setError('');
  };

  const generateId = () => {
    return Date.now().toString();
  };

  return (
    <FormContainer>
      <FormTitle>ajouter tache</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="taskId">id (opt):</Label>
            <Input 
              type="text" 
              id="taskId"
              value={taskId} 
              onChange={(e) => setTaskId(e.target.value)}
              placeholder="gen auto si vide"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="status">status:</Label>
            <Select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">non termine</option>
              <option value="completed">termine</option>
            </Select>
          </FormGroup>
        </FormGrid>
        <FormGroup>
          <Label htmlFor="title">titre:</Label>
          <Input 
            type="text" 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">description:</Label>
          <TextArea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">
          ajouter
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AddTaskForm;
