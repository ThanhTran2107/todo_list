import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { COLORS } from "../../utilities/constant";
import { Button } from "./../../components/button.component";
import { TextField } from "./../../components/text-field.component";
import { Space } from "./../../components/space.component";
import { Notification } from "./../../components/notification.component";
import { Dropdown } from "./../../components/dropdown.component";
import { isEmpty } from "lodash-es";

const Title = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: ${COLORS.BLUE_GREEN};
`;

const StyledTextField = styled(TextField)`
  width: 30rem;
  height: 2.5rem;
`;

const AddButton = styled(Button)`
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

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = ({
  todoCount,
  completedCount,
  uncompletedCount,
  isSearching,
  handleResetData,
  onAddTodoList,
  onSearchTasksByName,
}) => {
  const [input, setInput] = useState("");

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

  const handleInputChange = (e) => {
    if (isEmpty(e.target.value)) handleResetData();

    setInput(e.target.value);
  };

  const onAddNewTasks = () => {
    const newTodo = input.trim();

    if (!newTodo) {
      Notification.error({
        message: "Công việc không được để trống",
      });

      return;
    }

    onAddTodoList((prev) => [
      {
        id: uuidv4(),
        name: newTodo,
        completed: false,
      },
      ...prev,
    ]);

    Notification.success({ message: "Thêm công việc thành công" });
    setInput("");
  };

  return (
    <>
      <Title>Danh Sách Công Việc</Title>

      <StyledDiv>
        <Space>
          <StyledTextField
            placeholder="Nhập công việc..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (!isEmpty(input) && e.key === "Enter") onAddNewTasks();
            }}
            value={input}
          />

          <AddButton
            disabled={!input || isSearching}
            type="primary"
            onClick={() => onAddNewTasks()}
          >
            Thêm
          </AddButton>

          <SearchButton
            icon={faSearch}
            onClick={() => onSearchTasksByName(input)}
          />
        </Space>

        <Dropdown menu={{ items }} trigger={["hover"]}>
          <p>{todoCount} Công việc</p>
        </Dropdown>
      </StyledDiv>
    </>
  );
};

Header.propTypes = {
  todoCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  uncompletedCount: PropTypes.number.isRequired,
  isSearching: PropTypes.bool,
  handleResetData: PropTypes.func.isRequired,
  onAddTodoList: PropTypes.func.isRequired,
  onSearchTasksByName: PropTypes.func.isRequired,
};
