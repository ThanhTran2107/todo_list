import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import { COLORS } from "../../utilities/constant";
import { Button } from "./../../components/button.component";
import { TextField } from "./../../components/text-field.component";
import { Space } from "./../../components/space.component";
import { Notification } from "./../../components/notification.component";

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

export const Header = ({ todoList, ordinalNumber, onAddTodoList }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddInput = () => {
    const newTodo = input.trim();

    if (!newTodo) {
      Notification.error({
        message: "Công việc không được để trống",
      });

      return;
    }

    ordinalNumber += 1;

    onAddTodoList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        ordinal: ordinalNumber,
        name: newTodo,
        completed: false,
      },
    ]);

    Notification.success({ message: "Thêm công việc thành công" });
    setInput("");
  };

  return (
    <>
      <StyledTitle>Danh Sách Công Việc</StyledTitle>

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
    </>
  );
};
