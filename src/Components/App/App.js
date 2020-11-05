import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import styles from './App.module.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        }]
    }
    this.maxId = 4;
    this.countNotCompleted = this.countNotCompleted.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  countNotCompleted() {
    const notCompleted = this.state.todoItems.filter(item => !item.isDone);
    return notCompleted.length;
  }

  findAndChangeElementById(id, changeItemFunction) {
    this.setState(({todoItems}) => {
      const index = todoItems.findIndex(elem => elem.id === id);
      const old = todoItems[index];
      const newItem = changeItemFunction(old);
      const newArr = [...todoItems.slice(0, index), newItem, ...todoItems.slice(index + 1)];
      return {
        todoItems: newArr
      }
    })
  }

  onClickDone(id) {
    this.findAndChangeElementById(id, (old) => {
      return {...old, isDone: !old.isDone};
    });
  }


  onMouseOver(id) {
    this.findAndChangeElementById(id, (old) => {
      return {...old, showIcon: !old.showIcon};
    });
  }

  onClickDelete(id) {
    this.setState(({todoItems}) => {
      const index = todoItems.findIndex(elem => elem.id === id);
      const newArr = [...todoItems.slice(0, index), ...todoItems.slice(index + 1)];
      return {
        todoItems: newArr
      }
    })
  }

  onClickAdd(value) {
    const newItem = {
      value: value,
      id: this.maxId++,
      isDone: false,
      showIcon: false
    }
    this.setState(({todoItems}) => {
      const newArr = [...todoItems, newItem];
      return {
        todoItems: newArr
      }
    })
  }

  render() {
    const count = this.countNotCompleted();
    return (
      <div className={styles.wrap}>
        <div>
          <h1 className={styles.title}>Things to do</h1>
          <InputItem addItem={this.onClickAdd}/>
          <ItemList todoItems={this.state.todoItems}
                    itemHover={this.onMouseOver}
                    onClickDone={this.onClickDone}
                    onClickDelete={this.onClickDelete}
          />
          <Footer count={count}/>
        </div>
      </div>
    )
  }
}