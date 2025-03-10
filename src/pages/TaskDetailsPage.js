import React from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTaskById } from '../services/TaskService';
import LoadingIndicator from '../components/LoadingIndicator';

const DetailsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const DetailsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary + '30'};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const TaskInfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

const BackButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const TaskDetailsPage = ({ tasks }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let foundTask = tasks.find(t => t.id === taskId);
    
    if (!foundTask) {
      const fetchTask = async () => {
        const taskData = await getTaskById(taskId);
        if (taskData) {
          setTask(taskData);
        } else {
          navigate('/');
        }
        setLoading(false);
      };
      fetchTask();
    } else {
      setTask(foundTask);
      setLoading(false);
    }
  }, [taskId, tasks, navigate]);

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

  if (loading) {
    return <DetailsContainer><LoadingIndicator message="charging..." /></DetailsContainer>;
  }

  if (!task) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <Header>
            <Title>tache pas trouve</Title>
            <BackButton to="/">retour</BackButton>
          </Header>
          <TaskInfoContent>
            tache {taskId} pas trouve
          </TaskInfoContent>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <DetailsCard>
        <Header>
          <Title>details tache</Title>
          <BackButton to="/">retour</BackButton>
        </Header>
        
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
          <TaskInfoLabel>Status</TaskInfoLabel>
          <TaskStatus completed={task.completed}>
            {task.completed ? 'termine' : 'a faire'}
          </TaskStatus>
        </TaskInfoSection>
        
        <TaskInfoSection>
          <TaskInfoLabel>daate creation</TaskInfoLabel>
          <TaskInfoContent>{formatDate(task.creationDate)}</TaskInfoContent>
        </TaskInfoSection>
      </DetailsCard>
    </DetailsContainer>
  );
};

export default TaskDetailsPage;
