import React, {Component} from 'react';
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default class ItemList extends Component {
  onChangeValue = (id, value) => {
    this.props.onDoubleChange(id, value);
  }

  componentDidMount() {
    this.props.toChangeState();
  }

  render() {
    const {itemHover, onClickDone, onClickDelete} = this.props;
    let element = this.props.todoItems.map(item => {
      const {id, showIcon,  visible, value, isDone, ...itemProps} = item;
      return (
        <div key={id}
             onMouseOver={()=> itemHover(id)}
             onMouseOut={() => itemHover(id)}
             className={visible ? styles.wrap : styles.invisible}
        >
          <Item
            id={id}
            value={value}
            isDone={isDone}
            showIcon={showIcon}
            onClickDone={onClickDone}
            setFieldValue={this.onChangeValue}
          />
          <div className={showIcon ? styles.visible : styles.invisible}>
            <IconButton
              onClick={()=> onClickDelete(id)}>
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
