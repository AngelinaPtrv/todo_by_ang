import React, {Component} from 'react';
import Footer from "../Footer/Footer";
import InputItem from "../InputItem/InputItem";
import ItemList from "../ItemList/ItemList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        {
          value: 'Закончить модуль',
          isDone: true,
          id: 1
        },
        {
          value: 'Заплатить по счетам',
          isDone: false,
          id: 2
        },
        {
          value: 'Навести порядок',
          isDone: true,
          id: 3
        }]
    }
  }
  render() {
    return (
      <div>
        <h1>Things to do</h1>
        <InputItem/>
        <ItemList todoItems={this.state.todoItems}/>
        <Footer/>
      </div>
    )
  }
}
