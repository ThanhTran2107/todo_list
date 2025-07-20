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

const TableWrapper = styled.div`
  width: 100%;

  @media (max-width: 550px) {
    table {
      width: 550px;
    }
  }
`;

const StyledButton = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
`;

const CompleteButton = styled(StyledButton)`
  color: ${COLORS.BRIGHT_GREEN};
  cursor: pointer;

  &:hover {
    color: ${COLORS.GREEN};
  }
`;

const UncompleteButton = styled(StyledButton)`
  color: ${COLORS.BRIGHT_BLUE};
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
    <TableWrapper>
      <Table dataSource={todoList} onChange={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Column align="center" title="No." key="index" render={(_, __, index) => index + 1} />
        <Column
          align="center"
          title="Task name"
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
          title="Status"
          dataIndex="completed"
          key="completed"
          render={completed => (completed ? <p>Completed</p> : <p>Incompleted</p>)}
        />
        <Column
          align="center"
          title="Actions"
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
    </TableWrapper>
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
