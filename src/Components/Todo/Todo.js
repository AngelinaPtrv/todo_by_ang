import React, {useState} from "react";

import InputItem from "../InputItem/InputItem";
import ItemList from "../ItemList/ItemList";
import Footer from "../Footer/Footer";

import styles from './Todo.module.css';

const Todo = () => {
  const initialState = {
    todoItems: [
      {
        value: 'Закончить модуль',
        isDone: false,
        id: 1,
        showIcon: false,
        visible: true
      },
      {
        value: 'Заплатить по счетам',
        isDone: false,
        id: 2,
        showIcon: false,
        visible: true
      },
      {
        value: 'Навести порядок',
        isDone: false,
        id: 3,
        showIcon: false,
        visible: true
      }],
    maxId: 4
  };

  const [todoItems, setTodoItems] = useState(initialState.todoItems);
  const [maxId, setMaxId] = useState(initialState.maxId)
  const [error,setError] = useState({
    hasError: false,
    errorText: ''
  });

  const countNotCompleted = () => {
    const notCompleted = todoItems.filter(item => !item.isDone);
    return notCompleted.length;
  }

  const count = countNotCompleted();

  const findAndChangeElementById = (id, changeItemFunction) => {
    const index = todoItems.findIndex(elem => elem.id === id);
    const old = todoItems[index];
    const newItem = changeItemFunction(old);
    const newArr = [...todoItems.slice(0, index), newItem, ...todoItems.slice(index + 1)];
    setTodoItems(newArr);
  }

  const onError = (text) => {
    setError({
      hasError: true,
      errorText: text
    })
  };

  const clearError = () => {
    setError({
      hasError: false,
      errorText: ''
    })
  };

  const onClickDone = (id) => {
    findAndChangeElementById(id, (old) => {
      return {...old, isDone: !old.isDone};
    });
  }

  const onDoubleChange = (id, value) => {
    findAndChangeElementById(id, (old) => {
      return {...old, value: value}
    })
  }

  const onMouseOver = (id) => {
    findAndChangeElementById(id, (old) => {
      return {...old, showIcon: !old.showIcon};
    });
  }

  const onClickDelete = (id) => {
    const index = todoItems.findIndex(elem => elem.id === id);
    const newArr = [...todoItems.slice(0, index), ...todoItems.slice(index + 1)];
    setTodoItems(newArr);
  }

  const onClickAdd = (value) => {
    const newItem = {
      value: value,
      id: maxId,
      isDone: false,
      showIcon: false,
      visible: true
    }
    const result = todoItems.find((item) => item.value === value);
    if (result) {
      onError('Already exists!');
      return false;
    }
    const newArr = [...todoItems, newItem];
    setTodoItems(newArr);
    localStorage.setItem('items', JSON.stringify(newArr));
    setMaxId((maxId) => ++maxId);
    return true;
  }

  const toShowCompleted = () => {
    const arrCompleted = todoItems.map(item => {
      !item.isDone ?
        item.visible = false :
        item.visible = true
      return item;
    })
    setTodoItems(arrCompleted);
  }

  const toShowActive = () => {
    const arrCompleted = todoItems.map(item => {
      item.isDone ?
        item.visible = false :
        item.visible = true
      return item;
    })
    setTodoItems(arrCompleted);
  }

  const toShowAll = () => {
    const arrCompleted = todoItems.map(item => {
      item.visible = true;
      return item;
    })
    setTodoItems(arrCompleted);
  }

  const toClearCompleted = () => {
    const arrCompleted = todoItems.filter(item => !item.isDone);
    setTodoItems(arrCompleted);
  }

  const toChangeState = () => {
    if (localStorage.getItem('items')) {
      const newItemList = JSON.parse(localStorage.getItem('items'));
      setTodoItems(newItemList);
      const newId = newItemList.length + 1;
      setMaxId(newId);
    }
  }

  return (
    <div className={styles.wrap}>
      <div>
        <h1 className={styles.title}>Things to do</h1>
        <InputItem
          clearError={clearError}
          error={error}
          onError={onError}
          addItem={onClickAdd}
        />
        {error.hasError && <div>{error.errorText}</div>}
        <ItemList
          todoItems={todoItems}
          itemHover={onMouseOver}
          onClickDone={onClickDone}
          onClickDelete={onClickDelete}
          onDoubleChange={onDoubleChange}
          toChangeState={toChangeState}
        />
        <Footer
          count={count}
          toShowAll={toShowAll}
          toShowCompleted={toShowCompleted}
          toShowActive={toShowActive}
          toClearCompleted={toClearCompleted}
        />
      </div>
    </div>
  )
}

export default Todo;