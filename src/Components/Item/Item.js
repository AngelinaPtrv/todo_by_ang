import React from 'react';
import classnames from 'classnames';
import styles from './Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const Item = ({id, value, isDone, onClickDone}) => {

  Item.prototype = {
    value: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onClickDone: PropTypes.func.isRequired
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