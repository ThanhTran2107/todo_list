import { Space } from "../components/space.component";
import { Notification } from "../components/notification.component";
import { Header } from "./components/header.component";

import styled from "styled-components";
import { TodoList } from "./components/todo-list.component";

import { useEffect, useRef, useState } from "react";
import { map } from "lodash-es";

const Wrapper = styled(Space)`
  display: flex;
  margin: 1rem;
`;

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState([]);
  const ordinalNumber = useRef(0);

  const onCompleteHandler = (id) => {
    setTodoList((prev) => {
      const updatedList = map(prev, (todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      localStorage.setItem("todoList", JSON.stringify(updatedList));

      return updatedList;
    });

    Notification.success({
      message: "Cập nhật trạng thái công việc thành công",
    });
  };

  useEffect(() => {
    const currentTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    setTodoList(currentTodoList);

    ordinalNumber.current = currentTodoList.length
      ? Math.max(map(...currentTodoList, (e) => e.ordinal))
      : 0;
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify([...todoList]));
  }, [todoList]);
  
  return (
    <Wrapper direction="vertical">
      <Header
        todoList={todoList}
        onAddTodoList={setTodoList}
        ordinalNumber={ordinalNumber.current}
      />

      <TodoList todoList={todoList} onComplete={onCompleteHandler} />
    </Wrapper>
  );
};
