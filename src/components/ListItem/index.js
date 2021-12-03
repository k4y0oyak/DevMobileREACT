import React, { useState } from "react";
import ListItemPopUp from "../ListItemPopUp";
import styles from "./ListItem.module.scss";

export default function ListItem(props) {
  const [createListItem, setcreateListItem] = useState(true);
  const [listItemBanner, setListItemBanner] = useState();
  const [listItemTitle, setListItemTitle] = useState("");
  const [listItemDescription, setListItemDescription] = useState("");
  const [listItemCompleted, setListItemCompleted] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);

  if (createListItem) {
    return (
      <li>
        <form
          className={styles.list_item}
          onSubmit={() => setcreateListItem(false)}
        >
          <input
            placeholder="Enter a title for this card..."
            autoFocus
            onChange={(e) => setListItemTitle(e.target.value)}
          />
          <div className={styles.button_container}>
            <button
              className={styles.button_primary}
              onClick={() => setcreateListItem(false)}
            >
              Add Card
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
          </div>
        </form>
      </li>
    );
  }
  return (
    <li
      draggable
      droppable
      onDrop={(event) => props.onDrop(event)}
      onDragStart={(event) =>
        event.dataTransfer.setData("key", event.target.id)
      }
      onDragOver={(event) => event.preventDefault()}
      className={styles.list_item_created}
      id={props.id}
    >
      <div
        className={styles.list_item_container}
        onClick={() => setOpenPopUp(true)}
        style={{
          backgroundColor: listItemCompleted ? "#6cff47" : "",
        }}
        id={props.id}
      >
        <p id={props.id}>{listItemTitle}</p>
      </div>
      <div className={styles.button_container}>
        <button
          className={styles.button_success}
          onClick={() => setListItemCompleted(!listItemCompleted)}
        >
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 1L6.9375 14L1 8.09091"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
      </div>
      {openPopUp === true ? (
        <ListItemPopUp
          setOpenPopUp={setOpenPopUp}
          listItemBanner={listItemBanner}
          setListItemBanner={setListItemBanner}
          listItemTitle={listItemTitle}
          setListItemTitle={setListItemTitle}
          listItemDescription={listItemDescription}
          setListItemDescription={setListItemDescription}
          listItemBanner={listItemBanner}
          setListItemBanner={setListItemBanner}
        />
      ) : null}
    </li>
  );
}
