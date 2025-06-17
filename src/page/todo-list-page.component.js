import { Space } from "../components/space.component";
import { Notification } from "../components/notification.component";
import { Header } from "./components/header.component";
import { Modal } from "./../components/modal.component";

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
  const [originalList, setOriginalList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  const updateStatistics = (list) => {
    const completedCount = filter(list, (todo) => todo.completed === true);
    const uncompletedCount = filter(list, (todo) => todo.completed === false);

    setCompletedCount(completedCount.length);
    setUncompletedCount(uncompletedCount.length);
  };

  const resetOriginalData = () => {
    if (isEmpty(originalList)) return;

    setTodoList(originalList);
    setOriginalList([]);
    setSearchedList([]);
  };

  const resetSearchedData = () => setTodoList(searchedList);

  const applyFilter = (data, value) => {
    switch (value) {
      case 0:
        return data;

      case true:
        return filter(data, (todo) => todo.completed);

      case false:
        return filter(data, (todo) => !todo.completed);

      default:
        return data;
    }
  };

  const showConfirmDeletion = (onOk) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa công việc này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk,
    });
  };

  const onCompleteTask = (id) => {
    const updateItemStatus = (list) =>
      map(list, (todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };

        return todo;
      });

    const updatedTodoList = updateItemStatus(todoList);
    const updatedSearchedList = updateItemStatus(searchedList);
    const updatedOriginalList = updateItemStatus(originalList);

    setTodoList(updatedTodoList);
    setSearchedList(updatedSearchedList);
    setOriginalList(updatedOriginalList);

    Notification.success({
      message: "Cập nhật trạng thái công việc thành công!",
    });
  };

  const onDeleteTask = (id) => {
    if (!id) return;

    showConfirmDeletion(() => {
      const deleteItem = (list) => filter(list, (todo) => todo.id !== id);

      const updatedTodoList = deleteItem(todoList);
      const updatedSearchedList = deleteItem(searchedList);
      const updatedOriginalList = deleteItem(originalList);

      setTodoList(updatedTodoList);
      setOriginalList(updatedOriginalList);
      setSearchedList(updatedSearchedList);

      Notification.success({
        message: "Xoá công việc thành công!",
      });
    });
  };

  const onSearchTasksByName = (name) => {
    const searchName = removeVietnameseTones(name.trim());

    if (!searchName) return;

    const found = filter(todoList, (todo) =>
      removeVietnameseTones(todo.name).includes(searchName)
    );

    setOriginalList(todoList);
    setTodoList(found);
    setSearchedList(found);
  };

  const onFilterData = (value) => {
    const hasSearch = !isEmpty(searchedList);
    const hasOriginal = !isEmpty(originalList);

    if (!hasOriginal) setOriginalList(todoList);

    if (value === 0) {
      if (hasSearch) {
        resetSearchedData();
      } else {
        resetOriginalData();
      }

      return;
    }

    const sourceData = hasSearch
      ? searchedList
      : hasOriginal
      ? originalList
      : todoList;

    const result = applyFilter(sourceData, value);

    setTodoList(result);
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
        isSearching={!isEmpty(originalList)}
        onAddTodoList={setTodoList}
        onSearchTasksByName={onSearchTasksByName}
        onResetOriginalData={resetOriginalData}
        onFilterData={onFilterData}
      />

      <TodoList
        todoList={todoList}
        onComplete={onCompleteTask}
        onDelete={onDeleteTask}
      />
    </Wrapper>
  );
};
