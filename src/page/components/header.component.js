import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { COLORS } from '../../utilities/constant';
import { Button } from './../../components/button.component';
import { ComboBox } from './../../components/combobox.component';
import { Dropdown } from './../../components/dropdown.component';
import { Notification } from './../../components/notification.component';
import { Space } from './../../components/space.component';
import { TextField } from './../../components/text-field.component';

const HeaderWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: ${COLORS.BLUE_GREEN};
`;

const StyledTextField = styled(TextField)`
  width: 30rem;
  height: 2.5rem;

  @media (max-width: 768px) {
    width: 10rem;
  }
`;

const AddButton = styled(Button)`
  height: 2.5rem;
  cursor: pointer;
`;

const DeleteAllButton = styled(Button)`
  height: 2.5rem;
  cursor: pointer;
`;

const SearchButton = styled(FontAwesomeIcon)`
  display: flex;
  align-seft: center;
  height: 1.5rem;
  color: ${COLORS.BRIGHT_BLUE};
  cursor: pointer;

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatisticDropdown = styled(Dropdown)`
  text-align: right;
`;

export const Header = ({
  todoCount,
  completedCount,
  uncompletedCount,
  isSearching,
  hasCurrentTasks,
  onResetOriginalData,
  onAddTodoList,
  onSearchTasksByName,
  onFilterData,
  onDeleteAllTasks,
}) => {
  const [input, setInput] = useState('');

  const items = [
    {
      label: <p>{completedCount} Completed</p>,
      key: completedCount,
    },
    {
      label: <p>{uncompletedCount} Incompleted</p>,
      key: uncompletedCount,
    },
  ];

  const options = [
    { label: 'All', value: 0 },
    { label: 'Completed', value: true },
    { label: 'Incompleted', value: false },
  ];

  const handleInputChange = e => {
    if (isEmpty(e.target.value)) onResetOriginalData();

    setInput(e.target.value);
  };

  const handleClickAddNewTasks = () => {
    const newTodo = input.trim();
    const createdAt = new Date();

    if (!newTodo) {
      Notification.error({
        message: 'Task name cannot be empty!',
      });

      return;
    }

    onAddTodoList(prev => [
      {
        id: uuidv4(),
        name: newTodo,
        createdAt: createdAt.toLocaleString(),
        completed: false,
      },
      ...prev,
    ]);

    Notification.success({ message: 'Add a task successfully!' });
    setInput('');
  };

  return (
    <HeaderWrapper>
      <Title>Workday Task Tracker</Title>

      <HeaderContainer>
        <Space style={{ marginTop: '3rem' }}>
          <StyledTextField
            placeholder="Enter a task..."
            onChange={handleInputChange}
            onKeyDown={e => {
              if (!isEmpty(input) && e.key === 'Enter') handleClickAddNewTasks();
            }}
            value={input}
          />

          <AddButton disabled={!input || isSearching} type="primary" onClick={() => handleClickAddNewTasks()}>
            Add
          </AddButton>

          <DeleteAllButton disabled={todoCount === 0} onClick={() => onDeleteAllTasks()}>
            Delete All
          </DeleteAllButton>

          <SearchButton icon={faSearch} onClick={() => onSearchTasksByName(input)} />
        </Space>

        <Space direction="vertical">
          <StatisticDropdown menu={{ items }} trigger={['hover']}>
            {todoCount > 1 ? <p>{todoCount} Tasks</p> : <p>{todoCount} Task</p>}
          </StatisticDropdown>

          <ComboBox
            defaultValue="All"
            style={{ width: '10rem' }}
            options={options}
            onChange={value => onFilterData(value)}
            disabled={!hasCurrentTasks}
          />
        </Space>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  todoCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  uncompletedCount: PropTypes.number.isRequired,
  isSearching: PropTypes.bool,
  hasCurrentTasks: PropTypes.bool,
  onResetOriginalData: PropTypes.func.isRequired,
  onAddTodoList: PropTypes.func.isRequired,
  onSearchTasksByName: PropTypes.func.isRequired,
  onFilterData: PropTypes.func.isRequired,
  onDeleteAllTasks: PropTypes.func.isRequired,
};
