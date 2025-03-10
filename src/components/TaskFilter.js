import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterLabel = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const FilterButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.light};
  color: ${({ active, theme }) => 
    active ? theme.colors.white : theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};
  font-weight: 500;
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.border};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '40'};
  }
`;

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <FilterContainer>
      <FilterLabel>Filtrer: </FilterLabel>
      <FilterButton 
        active={filter === 'all'} 
        onClick={() => onFilterChange('all')}
      >
        tout
      </FilterButton>
      <FilterButton 
        active={filter === 'active'} 
        onClick={() => onFilterChange('active')}
      >
        non termine
      </FilterButton>
      <FilterButton 
        active={filter === 'completed'} 
        onClick={() => onFilterChange('completed')}
      >
        termine
      </FilterButton>
    </FilterContainer>
  );
};

export default TaskFilter;
