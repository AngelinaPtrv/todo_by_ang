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
          isDone: true,
          id: 1,
          showIcon: false
        },
        {
          value: 'Заплатить по счетам',
          isDone: true,
          id: 2,
          showIcon: false
        },
        {
          value: 'Навести порядок',
          isDone: true,
          id: 3,
          showIcon: false
        }]
    }
    this.countNotCompleted = this.countNotCompleted.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  countNotCompleted() {
    const notCompleted = this.state.todoItems.filter(item => item.isDone);
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

  render() {
    const count = this.countNotCompleted();
    return (
      <div className={styles.wrap}>
        <div>
          <h1 className={styles.title}>Things to do</h1>
          <InputItem/>
          <ItemList todoItems={this.state.todoItems}
                    itemHover={this.onMouseOver}
                    onClickDone={this.onClickDone}/>
          <Footer count={count}/>
        </div>
      </div>
    )
  }
}