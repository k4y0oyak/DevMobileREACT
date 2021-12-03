import React, { useState, useEffect } from "react";
// import { DragDropContext } from "react-beautiful-dnd";
import DeleteListButton from "../DeleteListButton/index.js";
import ListItem from "../ListItem/index.js";
import styles from "./List.module.scss";

export default function List(props) {
  const [listTitle, setListTitle] = useState("");
  const [createList, setCreateList] = useState(true);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [listItemsKey, setListItemsKey] = useState(0);
  const toggleDeleteButton = () => {
    setDeleteButtonVisible((visible) => !visible);
  };

  //supprimer tâches
  const deleteListItem = (id) => {
    console.log("supprimer", id);
    setListItems((listItems) =>
      listItems.filter((listItem) => listItem.key !== id)
    );
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  //lorsqu'on lâche la souris, ça déclenche le useState setListItems
  const onDrop = (event) => {
    event.preventDefault();
    const currentKey = event.dataTransfer.getData("key");
    const targetKey = event.target.id;
    console.log("currentKey", currentKey);
    console.log("targetKey", targetKey);

    setListItems((listItems) => {
      console.log("reorder", reorder(listItems, currentKey, targetKey));
      return reorder(listItems, currentKey, targetKey);
    });
  };

  //creer tâches dans une liste
  const createListItem = () => {
    const newListItems = [...listItems, { key: listItemsKey }];

    setListItems(newListItems);
    setListItemsKey(listItemsKey + 1);
  };

  console.log("listItems", listItems);

  if (createList) {
    return (
      <li className={styles.list_wrapper}>
        <form className={styles.list} onSubmit={() => setCreateList(false)}>
          <input
            placeholder="Enter list title..."
            onChange={(e) => {
              setListTitle(e.target.value);
            }}
            className={styles.list_title_input}
            autoFocus
          />
        </form>
        <form className={styles.list} onSubmit={() => setCreateList(false)}>
          <button
            className={styles.button_primary}
            onClick={() => {
              setCreateList(false);
            }}
          >
            Add List
          </button>
          <button
            className={styles.button_delete}
            onClick={() => props.handleDelete(props.id)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36401 6.36398L19.0919 19.0919"
                stroke="#838383"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.36401 19.0919L19.0919 6.36397"
                stroke="#838383"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </li>
    );
  }
  return (
    <li className={styles.list_wrapper}>
      <div className={styles.list}>
        <textarea
          value={listTitle}
          onChange={(e) => {
            setListTitle(e.target.value);
          }}
          className={styles.list_title}
        ></textarea>
        <button
          className={styles.more_actions}
          onClick={() => toggleDeleteButton()}
        >
          <svg
            width="34"
            height="8"
            viewBox="0 0 34 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7C18.6569 7 20 5.65685 20 4C20 2.34315 18.6569 1 17 1C15.3431 1 14 2.34315 14 4C14 5.65685 15.3431 7 17 7Z"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 7C31.6569 7 33 5.65685 33 4C33 2.34315 31.6569 1 30 1C28.3431 1 27 2.34315 27 4C27 5.65685 28.3431 7 30 7Z"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <ul className={styles.list_items}>
        {listItems.map((item) => (
          <ListItem
            key={item.key}
            id={item.key}
            handleDelete={deleteListItem}
            onDrop={onDrop}
          />
        ))}
      </ul>
      <button className={styles.cross} onClick={() => createListItem()}>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1V19"
            stroke="#838383"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 10H19"
            stroke="#838383"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p> Create a new card</p>
      </button>

      {deleteButtonVisible ? (
        <DeleteListButton handleDelete={props.handleDelete} id={props.id} />
      ) : null}
    </li>
  );
}
