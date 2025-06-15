import { Table } from "./../../components/table.component";
import { Divider } from "./../../components/divider.component";
import { Space } from "./../../components/space.component";

import { COLORS } from "../../utilities/constant";

import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRedo, faTrash } from "@fortawesome/free-solid-svg-icons";

const { Column } = Table;

const CompleteButton = styled(FontAwesomeIcon)`
  color: ${COLORS.BRIGHT_GREEN};
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    color: ${COLORS.GREEN};
  }
`;

const UncompleteButton = styled(FontAwesomeIcon)`
  color: ${COLORS.BRIGHT_BLUE};
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

const DeleteButton = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
  color: ${COLORS.DARK_GRAY};

  &:hover {
    color: ${COLORS.RED};
  }
`;

export const TodoList = ({ todoList, onComplete, onDelete }) => {
  return (
    <Table dataSource={todoList}>
      <Column title="STT" key="index" render={(_, __, index) => index + 1} />
      <Column
        title="Tên Công Việc"
        key="name"
        render={(_, record) => (
          <span
            style={{
              textDecoration: record.completed ? "line-through" : "none",
            }}
          >
            {record.name}
          </span>
        )}
      />
      <Column
        align="center"
        title="Trạng thái"
        dataIndex="completed"
        key="completed"
        render={(completed) =>
          completed ? <p>Hoàn thành</p> : <p>Chưa hoàn thành</p>
        }
      />
      <Column
        align="center"
        title="Tác vụ"
        dataIndex="completed"
        key="actions"
        render={(completed, record) => (
          <Space size="middle">
            {!completed ? (
              <CompleteButton
                icon={faCheck}
                onClick={() => onComplete(record.id)}
              />
            ) : (
              <UncompleteButton
                icon={faRedo}
                onClick={() => onComplete(record.id)}
              />
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
    })
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
