import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputItem = () => {
  return (
    <TextField
      id="outlined-basic"
      label="Enter task"
      fullWidth
      variant="outlined" />
  )
};

export default InputItem;
