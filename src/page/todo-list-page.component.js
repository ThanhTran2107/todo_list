import { Space } from "../components/space.component";
import { Notification } from "../components/notification.component";
import { Header } from "./components/header.component";

import styled from "styled-components";
import { TodoList } from "./components/todo-list.component";

import { useEffect, useState } from "react";
import { map, filter } from "lodash-es";

import { getLocalStorage, setLocalStorage } from "../utilities/services/common";

const Wrapper = styled(Space)`
  display: flex;
  margin: 1rem;
`;

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  const onCompleteTask = (id) => {
    setTodoList((prev) => {
      const updatedList = map(prev, (todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      setLocalStorage("todoList", updatedList);

      return updatedList;
    });

    Notification.success({
      message: "Cập nhật trạng thái công việc thành công",
    });
  };

  const onDeleteTask = (id) => {
    if (!id) return;

    const updatedList = filter(todoList, (todo) => todo.id !== id);

    setTodoList(updatedList);

    Notification.success({
      message: "Xoá công việc thành công",
    });
  };

  const updateStatistics = (list) => {
    const completedCount = filter(list, (todo) => todo.completed === true);
    const uncompletedCount = filter(list, (todo) => todo.completed === false);

    setCompletedCount(completedCount.length);
    setUncompletedCount(uncompletedCount.length);
  };

  useEffect(() => {
    const currentTodoList = getLocalStorage("todoList");

    updateStatistics(currentTodoList);
    setTodoList(currentTodoList);
  }, []);

  useEffect(() => {
    updateStatistics(todoList);
    setLocalStorage("todoList", [...todoList]);
  }, [todoList]);

  return (
    <Wrapper direction="vertical">
      <Header
        todoCount={todoList.length}
        completedCount={completedCount}
        uncompletedCount={uncompletedCount}
        onAddTodoList={setTodoList}
      />

      <TodoList
        todoList={todoList}
        onComplete={onCompleteTask}
        onDelete={onDeleteTask}
      />
    </Wrapper>
  );
};
