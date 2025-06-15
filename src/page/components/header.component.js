import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import { useState } from "react";

import { COLORS } from "../../utilities/constant";
import { Button } from "./../../components/button.component";
import { TextField } from "./../../components/text-field.component";
import { Space } from "./../../components/space.component";
import { Notification } from "./../../components/notification.component";
import { Divider } from "./../../components/divider.component";
import { Dropdown } from "./../../components/dropdown.component";

const StyledTitle = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: ${COLORS.BLUE_GREEN};
`;

const StyledTextField = styled(TextField)`
  width: 30rem;
  height: 2.5rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  height: 2.5rem;
  margin-bottom: 1rem;
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
  onAddTodoList,
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

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddInput = () => {
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
      <StyledTitle>Danh Sách Công Việc</StyledTitle>

      <StyledDiv>
        <Space>
          <StyledTextField
            placeholder="Nhập công việc..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddInput(input);
            }}
            value={input}
          />

          <StyledButton
            disabled={!input}
            type="primary"
            onClick={() => handleAddInput()}
          >
            Thêm
          </StyledButton>
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
  onAddTodoList: PropTypes.func.isRequired,
};
