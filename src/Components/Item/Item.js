import React, {Component} from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import classnames from 'classnames';
import styles from './Item.module.css';

export default class Item extends Component {
  state = {
    editable: false
  };

  render() {
    const {id, value, isDone, onClickDone, itemHover} = this.props;
    return (
      <div className={styles.wrap}>
        <li className={
          classnames({
            [styles.item]: true,
            [styles.done]: isDone
          })
        }
            onBlur={() => {
              this.setState({editable: false});
            }}
            onDoubleClick={() => {
              itemHover(id);
              this.setState({editable: true});
            }}>
          <Checkbox
            color="primary"
            inputProps={{'aria-label': 'uncontrolled-checkbox'}}
            onClick={() => onClickDone(id)}
          />

          {
            this.state.editable
              ? <TextField id="standard-basic"
                           value={value}
                           onChange={(e) =>
                             this.props.setFieldValue(id, e.target.value)}/>
              : <span>{value}</span>
          }
        </li>
      </div>
    )
  }
}