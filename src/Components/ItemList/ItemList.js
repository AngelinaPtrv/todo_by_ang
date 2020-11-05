import React from 'react';
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const ItemList = ({todoItems, itemHover, onClickDone}) => {
  let element = todoItems.map(item => {
    const {id, showIcon,  ...itemProps} = item;
    return (
      <div key={id}
           onMouseEnter={()=> itemHover(id)}
           onMouseLeave={() => itemHover(id)}
           className={styles.wrap}>
        <Item
          id={id}
          value={itemProps.value}
          isDone={itemProps.isDone}
          onClickDone={onClickDone}
        />
        <IconButton className={showIcon ? styles.delete : styles.nodelete}>
          <DeleteOutlinedIcon/>
        </IconButton>
      </div>
    )
  });
  return (
  <ul className={styles.list}>
    {element}
  </ul>
  )
};

export default ItemList;