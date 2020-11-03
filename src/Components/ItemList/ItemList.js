import React from 'react';
import Item from "../Item/Item";

const ItemList = ({todoItems}) => {
  let element;
  element = todoItems.map(item => {
    const {id,...itemProps} = item;
    return (
      <div key={id}>
        <Item
          value={itemProps.value}
        />
      </div>
    )
  });
  return (
  <ul>
    {element}
  </ul>
  )
};

export default ItemList;