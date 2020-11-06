import React from 'react';
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PropTypes from 'prop-types';

const ItemList = ({todoItems, itemHover, onClickDone, onClickDelete}) => {
  let element = todoItems.map(item => {
    const {id, showIcon,  ...itemProps} = item;
    return (
      <div key={id}
           onMouseOver={()=> itemHover(id)}
           onMouseOut={() => itemHover(id)}
           className={styles.wrap}>
        <Item
          id={id}
          value={itemProps.value}
          isDone={itemProps.isDone}
          onClickDone={onClickDone}
        />
        <div className={showIcon ? styles.delete : styles.nodelete}>
          <IconButton
            onClick={()=>onClickDelete(id)}>
            <DeleteOutlinedIcon/>
          </IconButton>
        </div>
      </div>
    )
  });

  ItemList.prototype = {
    todoItems: PropTypes.object.isRequired,
    itemHover: PropTypes.func.isRequired,
    onClickDone: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
  }

  return (
  <ul className={styles.list}>
    {element}
  </ul>
  )
};

export default ItemList;