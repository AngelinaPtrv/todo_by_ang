import React, {Component} from 'react';
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  onChangeValue = (id, value) => {
    console.log("id", id);
    console.log("value", value);
    this.props.onDoubleChange(id, value);
  }

  render() {
    let element = this.props.todoItems.map(item => {
      const {id, showIcon,  ...itemProps} = item;
      return (
        <div key={id}
             onMouseOver={()=> this.props.itemHover(id)}
             onMouseOut={() => this.props.itemHover(id)}
             className={styles.wrap}>
          <Item
            id={id}
            value={itemProps.value}
            isDone={itemProps.isDone}
            onClickDone={this.props.onClickDone}
            setFieldValue={this.onChangeValue}
          />
          <div className={showIcon ? styles.delete : styles.nodelete}>
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

// const ItemList = ({todoItems, itemHover, onClickDone, onClickDelete, onDoubleClick}) => {
//
//   const onChangeValue = (e) => {
//     this.setState({
//     value: e.target.value
//     })
//   }
//
//   let element = todoItems.map(item => {
//     const {id, showIcon,  ...itemProps} = item;
//     return (
//       <div key={id}
//            onMouseOver={()=> itemHover(id)}
//            onMouseOut={() => itemHover(id)}
//            className={styles.wrap}>
//         <Item
//           id={id}
//           value={itemProps.value}
//           isDone={itemProps.isDone}
//           onClickDone={onClickDone}
//           onDoubleClick={() => onDoubleClick(id)}
//         />
//         <div className={showIcon ? styles.delete : styles.nodelete}>
//           <IconButton
//             onClick={()=>onClickDelete(id)}>
//             <DeleteOutlinedIcon/>
//           </IconButton>
//         </div>
//       </div>
//     )
//   });
//
//   ItemList.prototype = {
//     todoItems: PropTypes.object.isRequired,
//     itemHover: PropTypes.func.isRequired,
//     onClickDone: PropTypes.func.isRequired,
//     onClickDelete: PropTypes.func.isRequired
//   }
//
//   return (
//   <ul className={styles.list}>
//     {element}
//   </ul>
//   )
// };
//
// export default ItemList;