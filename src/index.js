import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createRoot } from "react-dom/client";
import axios from "axios";
import store from "./store";
import Items from "./Items";

const App = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState('');
  const currentItems = useSelector((items) => store.items);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get("/api/items");
        dispatch({ type: "SET_ITEMS", items: data });
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, [currentItems]);

  //im fetching items once, at the start

//   const handleClick = (e) => {
//       e.preventDefault();
//       console.log("Item: "+item)
//       addItem(item);
//     //   dispatch({type: "NEW_ITEM", items: item})
//   }

  // const handleChange = (event) => {
  //     event.preventDefault();
  //     let value = event.target.value;
  //     setItem(value);
  //     addItem(item);
  // }
  //     //NEED TO CREATE/ADD NEWLY SUBMITTED ITEMS TO API/ITEMS. THEN AXIOS REQ INTO THE FORM!
  const handleSubmit = (e) => {
      e.preventDefault();
      addItem(item);
  }

  const addItem = async (items) => {
        //Item.create({name: 'sugar'}),
    const name = items
      try {
        const response = await axios.post("/api/items", {
          name
        });
        console.log('currently in addItem function: '+response.data)
        dispatch({ type: "NEW_ITEM", items: response.data });
      } catch (e) {
        console.log(e);
      }
    };


  return (
    <div>
      <h1>Welcome to an Item Store demo!</h1>
      <hr />
      <div>
        <Items />
        <form onSubmit={handleSubmit}>
            <label>Item addition:</label>
          <input
            placeholder="what rhymes with sugar?"
            type='text'
            required
            value = {item}
            onChange = {(e) => {
                setItem(e.target.value)
            }}
          />
          <button type='submit'>
            Add new item
          </button>
        </form>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
