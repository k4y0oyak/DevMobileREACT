import React, { useState, useEffect } from "react";
import styles from "./ListItemPopUp.module.scss";

// Fonctions permettant la personnalisation de la pop up de Card

export default function ListItemPopUp(props) {
  const [listItemTitleModified, setListItemTitleModified] = useState("");
  const [listItemDescriptionModified, setListItemDescriptionModified] =
    useState("");
  useEffect(() => {
    setListItemTitleModified(props.listItemTitle);
  }, [props.listItemTitle]);
  const reader = new FileReader();

  const saveListItem = () => {
    if (listItemTitleModified !== props.listItemTitle) {
      props.setListItemTitle(listItemTitleModified);
      // si le titre de la pop-up à été modifié -> alors ça affiche le titre avec les modifs
    } else {
      props.setListItemBanner(props.listItemBanner);
      props.setListItemTitle(props.listItemTitle);
    }
  };
  const unsavePopup = () => {
    props.setOpenPopUp(false);
    // props false -> annule la propriété setOpenPopUp -> pop-up se ferme
    if (props.listItemDescription !== listItemDescriptionModified) {
      props.setListItemDescription(props.listItemDescription);
    }
    // si la description a été modifiée -> alors ça n'enregistre pas les modifs
  };

  const printImg = (e) => {
    reader.addEventListener("load", () => {
      if (e.target.files[0]) {
        props.setListItemBanner(reader.result);
      }
    });
    reader.readAsDataURL(e.target.files[0]);
    // fonction permettant l'ajout de fichiers image dans la pop-up
  };

  return (
    <>
      <div
        className={styles.behind_popup}
        onClick={() => {
          unsavePopup();
          // OnClick déclenche l'annulation de la maj de la pop-up quand on clique en dehors de la pop-up
        }}
      ></div>
      <div className={styles.list_item_popup}>
        <button
          className={styles.cross}
          onClick={() => {
            unsavePopup();
          }}
          // OnClick déclenche l'annulation de la maj de la pop-up quand la croix est cliquée
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

        <div className={styles.bottom_content}>
          <label
            for="files"
            className={styles.button_primary}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Choisir une image</p>
          </label>
          <input
            id="files"
            onChange={(e) => printImg(e)}
            // OnChange déclenche la maj de de l'image quand l'input change
            type="file"
            size="50"
            title="Image"
          />
          {/* label + input -> bouton permettant l'ajout d'images */}
        </div>
        {props.listItemBanner && (
          <div className={styles.list_item_image}>
            <img src={props.listItemBanner} />
          </div>
        )}

        <div className={styles.bottom_content}>
          <h3>Task title :</h3>
          <textarea
            className={styles.list_item_title}
            onChange={(e) => setListItemTitleModified(e.target.value)}
            defaultValue={props.listItemTitle}
            minlength="5"
            maxlength="30"
          ></textarea>
          <h3>Description :</h3>
          <textarea
            className={styles.list_item_description}
            onChange={(e) => setListItemDescriptionModified(e.target.value)}
            defaultValue={props.listItemDescription}
            minlength="5"
            maxlength="30"
          ></textarea>
          <button
            className={styles.button_primary}
            onClick={() => {
              saveListItem();
              props.setListItemDescription(listItemDescriptionModified);
              props.setOpenPopUp(false);
              // OnClick -> enregistre les modifs et ferme la pop-up
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
