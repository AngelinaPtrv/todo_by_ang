import React, {Component} from 'react';
import classnames from 'classnames';
import styles from './Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";

export default class Item extends Component {
  state = {
    editable: false
  };

  render() {
    const {id, value, isDone, onClickDone, showIcon, itemHover} = this.props;
    return (
      <div className={styles.wrap}>
        <li className={
          classnames({
            [styles.item]: true,
            [styles.done]: isDone
          })
        }
            onBlur={() => {
              itemHover(id);
              this.setState({editable: false});
              console.log('blur ' + showIcon);
            }}
            onDoubleClick={() => {
              itemHover(id);
              this.setState({editable: true});
              console.log('double click ' + showIcon);
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