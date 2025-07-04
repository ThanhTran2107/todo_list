import { faCheck, faEdit, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utilities/constant';
import { Divider } from './../../components/divider.component';
import { Space } from './../../components/space.component';
import { Table } from './../../components/table.component';
import { EditTaskNameModal } from './edit-task-name-modal.component';

const { Column } = Table;

const StyledButton = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
`;

const CompleteButton = styled(StyledButton)`
  color: ${COLORS.BRIGHT_GREEN};

  &:hover {
    color: ${COLORS.GREEN};
  }
`;

const UncompleteButton = styled(StyledButton)`
  cursor: pointer;

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const DeleteButton = styled(StyledButton)`
  color: ${COLORS.DARK_GRAY};

  &:hover {
    color: ${COLORS.RED};
  }
`;

const EditButton = styled(StyledButton)`
  color: ${COLORS.BRIGHT_BLUE};

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const RowName = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TodoList = ({ todoList, onComplete, onDelete, onUpdateTaskName }) => {
  const [editRowId, setEditRowId] = useState(null);

  const handleSelectRowToUpdate = id => setEditRowId(id);

  const handleCloseEditModal = () => setEditRowId(null);

  return (
    <Table dataSource={todoList}>
      <Column title="STT" key="index" render={(_, __, index) => index + 1} />
      <Column
        title="Tên Công Việc"
        key="name"
        render={(_, record) => (
          <RowName>
            {editRowId === record.id && (
              <EditTaskNameModal
                isOpen={editRowId}
                selectedRow={record}
                onUpdateTaskName={onUpdateTaskName}
                onCloseEditModal={handleCloseEditModal}
              />
            )}
            <span
              style={{
                textDecoration: record.completed ? 'line-through' : 'none',
              }}
            >
              {record.name}
            </span>

            <EditButton icon={faEdit} onClick={() => handleSelectRowToUpdate(record.id)} />
          </RowName>
        )}
      />

      <Column
        align="center"
        title="Trạng thái"
        dataIndex="completed"
        key="completed"
        render={completed => (completed ? <p>Hoàn thành</p> : <p>Chưa hoàn thành</p>)}
      />
      <Column
        align="center"
        title="Tác vụ"
        dataIndex="completed"
        key="actions"
        render={(completed, record) => (
          <Space size="middle">
            {!completed ? (
              <CompleteButton icon={faCheck} onClick={() => onComplete(record.id)} />
            ) : (
              <UncompleteButton icon={faRedo} onClick={() => onComplete(record.id)} />
            )}

            <Divider type="vertical" />

            <DeleteButton icon={faTrash} onClick={() => onDelete(record.id)} />
          </Space>
        )}
      />
    </Table>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateTaskName: PropTypes.func.isRequired,
};
