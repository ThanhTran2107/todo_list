import { filter, isEmpty, map } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Notification } from '../components/notification.component';
import { ThemeSelector } from '../components/theme-selector.component';
import { CUSTOM_NOTIFICATION, LOCALSTORAGE_KEYS, MODAL_TITLES } from '../utilities/constant';
import { getLocalStorage, removeVietnameseTones, setLocalStorage } from '../utilities/services/common';
import { ConfirmDeletionModal } from './components/confirm-deletion-modal.component';
import { Header } from './components/header.component';
import { TodoList } from './components/todo-list.component';

const Wrapper = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const { TODO_LIST, ORIGINAL_LIST } = LOCALSTORAGE_KEYS;
const { DELETE_ALL_TASKS, DELETE_A_TASK } = MODAL_TITLES;

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);
  const hasResetFilterRef = useRef(0);

  const updateStatistics = list => {
    const completedCount = filter(list, todo => todo.completed === true);
    const uncompletedCount = filter(list, todo => todo.completed === false);

    setCompletedCount(completedCount.length);
    setUncompletedCount(uncompletedCount.length);
  };

  const applyFilter = (data, value) => {
    switch (value) {
      case 0:
        hasResetFilterRef.current = 0;

        return data;

      case true:
        hasResetFilterRef.current = 1;

        return filter(data, todo => todo.completed);

      case false:
        hasResetFilterRef.current = 2;

        return filter(data, todo => !todo.completed);

      default:
        return data;
    }
  };

  const handleResetOriginalData = () => {
    if (isEmpty(originalList)) return;

    hasResetFilterRef.current = 0;

    setTodoList(originalList);
    setSearchedList([]);
  };

  const handleResetSearchedData = () => setTodoList(searchedList);

  const handleAddNewTasks = newTask => {
    setTodoList(prev => [newTask, ...prev]);
    setOriginalList(prev => [newTask, ...prev]);
  };

  const handleCompleteTask = id => {
    const updateItemStatus = list =>
      map(list, todo => {
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
      message: 'Update the task status successfully!',
      ...CUSTOM_NOTIFICATION,
    });
  };

  const handleSearchTasksByName = name => {
    const searchName = removeVietnameseTones(name.trim());

    if (!searchName) return;

    const found = filter(originalList, todo => removeVietnameseTones(todo.name).includes(searchName));

    setTodoList(found);
    setSearchedList(found);
  };

  const handleFilterData = value => {
    const hasSearch = !isEmpty(searchedList);
    const hasOriginal = !isEmpty(originalList);

    if (!hasOriginal) setOriginalList(todoList);

    if (value === 0) {
      hasSearch ? handleResetSearchedData() : handleResetOriginalData();

      return;
    }

    const sourceData = hasSearch ? searchedList : hasOriginal ? originalList : todoList;

    const result = applyFilter(sourceData, value);

    setTodoList(result);
  };

  const handleUpdateTaskName = updatedTaskName => {
    const updatedItemName = list =>
      map(list, todo => {
        if (todo.id === updatedTaskName.id) return { ...updatedTaskName };

        return todo;
      });

    const updatedTodoList = updatedItemName(todoList);
    const updatedSearchedList = updatedItemName(searchedList);
    const updatedOriginalList = updatedItemName(originalList);

    setTodoList(updatedTodoList);
    setSearchedList(updatedSearchedList);
    setOriginalList(updatedOriginalList);

    Notification.success({
      message: 'Update the task name successfully!',
      ...CUSTOM_NOTIFICATION,
    });
  };

  const handleDeleteTask = id => {
    ConfirmDeletionModal({
      onOk: () => {
        const deleteItem = list => filter(list, todo => todo.id !== id);

        const updatedTodoList = deleteItem(todoList);
        const updatedSearchedList = deleteItem(searchedList);
        const updatedOriginalList = deleteItem(originalList);

        setTodoList(updatedTodoList);
        setOriginalList(updatedOriginalList);
        setSearchedList(updatedSearchedList);

        Notification.success({
          message: 'Delete the task successfully!',
          ...CUSTOM_NOTIFICATION,
        });
      },
      title: DELETE_A_TASK,
    });
  };

  const handleDeleteAllTasks = () => {
    ConfirmDeletionModal({
      onOk: () => {
        setTodoList([]);
        setOriginalList([]);
        setSearchedList([]);

        Notification.success({ message: 'Delete all tasks successfully!', ...CUSTOM_NOTIFICATION });
      },
      title: DELETE_ALL_TASKS,
    });
  };

  useEffect(() => {
    const todoListData = getLocalStorage(TODO_LIST);
    const originalListData = getLocalStorage(ORIGINAL_LIST);

    if (!isEmpty(originalListData)) {
      updateStatistics(originalListData);
      setTodoList(originalListData);
      setOriginalList(originalListData);

      return;
    }

    updateStatistics(todoListData);
    setTodoList(todoListData);
    setOriginalList(originalListData);
  }, []);

  useEffect(() => {
    updateStatistics(todoList);

    setLocalStorage(TODO_LIST, [...todoList]);
    setLocalStorage(ORIGINAL_LIST, [...originalList]);
  }, [todoList, originalList]);

  return (
    <Wrapper>
      <ThemeSelector />

      <Header
        todoCount={todoList.length}
        completedCount={completedCount}
        uncompletedCount={uncompletedCount}
        hasCurrentTasks={!isEmpty(originalList)}
        hasResetFilter={hasResetFilterRef.current}
        onAddTodoList={handleAddNewTasks}
        onSearchTasksByName={handleSearchTasksByName}
        onResetOriginalData={handleResetOriginalData}
        onFilterData={handleFilterData}
        onDeleteAllTasks={handleDeleteAllTasks}
      />

      <TodoList
        todoList={todoList}
        onComplete={handleCompleteTask}
        onDelete={handleDeleteTask}
        onUpdateTaskName={handleUpdateTaskName}
      />
    </Wrapper>
  );
};
