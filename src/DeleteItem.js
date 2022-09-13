import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteItem = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const handleClick = async (e) => {
    e.preventDefault();
    // const response = await axios.delete('/api/items', {
    // })
    console.log("all Items: ", items)
    console.log("props ID: ", props.id)

    dispatch({type: "DELETE_ITEM", id: props.id})
    console.log("AFTER-DELETE: ",items)
  };

    return (
        <button id={props.id} onClick={handleClick}>
        <small> Delete this item</small>
      </button>
    )
}

export default DeleteItem
