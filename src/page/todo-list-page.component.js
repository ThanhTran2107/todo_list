import { Space } from "../components/space.component";
import { Notification } from "../components/notification.component";
import { Header } from "./components/header.component";

import styled from "styled-components";
import { TodoList } from "./components/todo-list.component";

import { useEffect, useState } from "react";
import { map, filter, isEmpty } from "lodash-es";

import {
  getLocalStorage,
  setLocalStorage,
  removeVietnameseTones,
} from "../utilities/services/common";

const Wrapper = styled(Space)`
  display: flex;
  margin: 1rem;
`;

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [tempTodoList, setTempTodoList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  const updateStatistics = (list) => {
    const completedCount = filter(list, (todo) => todo.completed === true);
    const uncompletedCount = filter(list, (todo) => todo.completed === false);

    setCompletedCount(completedCount.length);
    setUncompletedCount(uncompletedCount.length);
  };

  const resetOriginalData = () => {
    if (isEmpty(tempTodoList)) return;

    setTodoList(tempTodoList);
    setTempTodoList([]);
  };

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

  const onSearchTasksByName = (name) => {
    const searchName = removeVietnameseTones(name.trim());

    if (!searchName) return;

    const found = filter(todoList, (todo) =>
      removeVietnameseTones(todo.name).includes(searchName)
    );

    setTempTodoList(todoList);
    setTodoList(found);
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
        isSearching={!isEmpty(tempTodoList)}
        onAddTodoList={setTodoList}
        onSearchTasksByName={onSearchTasksByName}
        handleResetData={resetOriginalData}
      />

      <TodoList
        todoList={todoList}
        onComplete={onCompleteTask}
        onDelete={onDeleteTask}
      />
    </Wrapper>
  );
};
