import React, {useEffect, useState} from 'react';
import Footer from '../Footer/Footer';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import styles from './App.module.css';

const App = () => {
  const initialState = {
      todoItems: [
        {
          value: 'Закончить модуль',
          isDone: false,
          id: 1,
          showIcon: false
        },
        {
          value: 'Заплатить по счетам',
          isDone: false,
          id: 2,
          showIcon: false
        },
        {
          value: 'Навести порядок',
          isDone: false,
          id: 3,
          showIcon: false
        }],
    maxId: 4
    };
  const [todoItems, setTodoItems] = useState(initialState.todoItems);
  const [maxId, setMaxId] = useState(initialState.maxId)

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


  const onClickDone = (id) => {
    findAndChangeElementById(id, (old) => {
      return {...old, isDone: !old.isDone};
    });
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
      showIcon: false
    }
    const newArr = [...todoItems, newItem];
    setTodoItems(newArr);
    setMaxId((maxId) => ++maxId);
  }

  useEffect(()=>{
    console.log('mount');
  },[initialState]);

  useEffect(()=>{
    console.log('update');
  },[count]);

    return (
      <div className={styles.wrap}>
        <div>
          <h1 className={styles.title}>Things to do</h1>
          <InputItem addItem={onClickAdd}/>
          <ItemList todoItems={todoItems}
                    itemHover={onMouseOver}
                    onClickDone={onClickDone}
                    onClickDelete={onClickDelete}
          />
          <Footer count={count}/>
        </div>
      </div>
    )
}

export default App;