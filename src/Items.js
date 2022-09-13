import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteItem from "./DeleteItem";
import store from "./store";

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  return (
    <ol>
      <b>
        {items.map((item) => {
          return (
            <li key={item.id} id={item.id}>
              {item.name}

              <DeleteItem id={item.id}/>
              <hr />
            </li>
          );
        })}
      </b>
    </ol>
  );
};

export default Items;
