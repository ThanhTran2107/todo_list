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
      label: <p>{completedCount} Hoàn thành</p>,
      key: completedCount,
    },
    {
      label: <p>{uncompletedCount} Chưa hoàn thành</p>,
      key: uncompletedCount,
    },
  ];

  const options = [
    { label: 'Tất cả', value: 0 },
    { label: 'Hoàn thành', value: true },
    { label: 'Chưa hoàn thành', value: false },
  ];

  const handleInputChange = e => {
    if (isEmpty(e.target.value)) onResetOriginalData();

    setInput(e.target.value);
  };

  const handleClickAddNewTasks = () => {
    const newTodo = input.trim();

    if (!newTodo) {
      Notification.error({
        message: 'Công việc không được để trống',
      });

      return;
    }

    onAddTodoList(prev => [
      {
        id: uuidv4(),
        name: newTodo,
        completed: false,
      },
      ...prev,
    ]);

    Notification.success({ message: 'Thêm công việc thành công' });
    setInput('');
  };

  return (
    <HeaderWrapper>
      <Title>Danh Sách Công Việc</Title>

      <HeaderContainer>
        <Space style={{ marginTop: '3rem' }}>
          <StyledTextField
            placeholder="Nhập công việc..."
            onChange={handleInputChange}
            onKeyDown={e => {
              if (!isEmpty(input) && e.key === 'Enter') handleClickAddNewTasks();
            }}
            value={input}
          />

          <AddButton disabled={!input || isSearching} type="primary" onClick={() => handleClickAddNewTasks()}>
            Thêm
          </AddButton>

          <DeleteAllButton disabled={todoCount === 0} onClick={() => onDeleteAllTasks()}>
            Xóa tất cả
          </DeleteAllButton>

          <SearchButton icon={faSearch} onClick={() => onSearchTasksByName(input)} />
        </Space>

        <Space direction="vertical">
          <StatisticDropdown menu={{ items }} trigger={['hover']}>
            <p>{todoCount} Công việc</p>
          </StatisticDropdown>

          <ComboBox
            defaultValue="Tất cả"
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
