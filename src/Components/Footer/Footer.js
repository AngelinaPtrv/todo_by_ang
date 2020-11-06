import React from 'react';
import styles from './Footer.module.css';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';

const Footer = ({count}) => {

  Footer.prototype = {
    count: PropTypes.number.isRequired
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.count}>{count} items left</div>
      <ButtonGroup
        size="small"
        variant="text"
        aria-label="text outlined button group">
        <Button style={{fontSize: '9px', color: '#c4c4c4'}}>All</Button>
        <Button style={{fontSize: '9px', color: '#c4c4c4'}}>Active</Button>
        <Button style={{fontSize: '9px', color: '#c4c4c4'}}>Completed</Button>
      </ButtonGroup>
      <Button style={{fontSize: '9px', color: '#c4c4c4'}}>Clear completed</Button>
    </div>
  )

};


export default Footer;