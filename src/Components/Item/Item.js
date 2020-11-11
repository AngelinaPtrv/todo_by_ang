import React, {Component} from 'react';
import classnames from 'classnames';
import styles from './Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';

export default class Item extends Component {
  render() {
    const {id, value, isDone, onClickDone} = this.props;
    return (
      <div className={styles.wrap}>
        <li className={
          classnames({
            [styles.item]:true,
            [styles.done]:isDone})
        }>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            onClick={()=>onClickDone(id)}
          />
          {value}
        </li>
      </div>
    )
  }
}