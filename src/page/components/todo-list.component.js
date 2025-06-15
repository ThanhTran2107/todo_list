import { Table } from "./../../components/table.component";
import { COLORS } from "../../utilities/constant";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const { Column } = Table;

export const TodoList = ({ todoList, onComplete }) => {
  return (
    <Table dataSource={todoList} rowKey="id">
      <Column title="STT" dataIndex="ordinal" key="ordinal" />
      <Column title="Tên Công Việc" dataIndex="name" key="name" />
      <Column
        align="center"
        title="Trạng thái"
        dataIndex="completed"
        key="completed"
        render={(completed, record) =>
          completed ? (
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() => onComplete(record.id)}
              style={{ color: `${COLORS.GREEN}`, fontSize: "1.3rem" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={() => onComplete(record.id)}
              style={{ color: `${COLORS.RED}`, fontSize: "1.3rem" }}
            />
          )
        }
      />
      <Column
        align="center"
        title="Tác vụ"
        key="action"
        render={() => <FontAwesomeIcon icon={faTrash} />}  
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
};
