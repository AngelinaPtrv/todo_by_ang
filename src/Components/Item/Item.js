import React from 'react';
import classnames from 'classnames';
import styles from './Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';

const Item = ({id, value, isDone, onClickDone}) => {

  Item.defaultProps = {
    isDone: false
  }

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
};

export default Item;