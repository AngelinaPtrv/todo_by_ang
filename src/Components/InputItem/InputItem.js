import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import styles from './InputItem.module.css';

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onValueChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.clearError();
  }


  onClickAdd() {
    if (this.state.value) {
      if(this.props.addItem(this.state.value))
        this.setState({value: ''});
    } else {
      this.props.onError('Field is empty!');
    }
  }

  render() {
    return (
      <div
        className={styles.wrap}>
        <TextField
          error={this.props.error.hasError}
          id="standard-basic"
          label="Enter task"
          fullWidth
          onChange={this.onValueChange}
          value={this.state.value}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.onClickAdd}>Add</Button>
      </div>
    )
  }
};



