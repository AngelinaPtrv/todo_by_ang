import React, {Component} from 'react';
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

class ItemList extends Component {
  onChangeValue = (id, value) => {
    this.props.onDoubleChange(id, value);
  }

  render() {
    let element = this.props.todoItems.map(item => {
      const {id, showIcon,  visible, ...itemProps} = item;
      return (
        <div key={id}
             onMouseOver={()=> this.props.itemHover(id)}
             onMouseOut={() => this.props.itemHover(id)}
             className={visible ? styles.wrap : styles.invisible}
        >
          <Item
            id={id}
            value={itemProps.value}
            isDone={itemProps.isDone}
            showIcon={showIcon}
            onClickDone={this.props.onClickDone}
            setFieldValue={this.onChangeValue}
          />
          <div className={showIcon ? styles.visible : styles.invisible}>
            <IconButton
              onClick={()=>this.props.onClickDelete(id)}>
              <DeleteOutlinedIcon/>
            </IconButton>
          </div>
        </div>
      )
    });
    return (
    <ul className={styles.list}>
      {element}
    </ul>
    )
  }
}

export default ItemList;