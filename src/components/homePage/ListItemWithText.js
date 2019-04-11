import React from 'react';
import styles from "../loginPage/loginForm.module.css";
import {Divider, ListItem, ListItemText} from "@material-ui/core";

const ListItemWithText = (props) => {

  const {text} = props;

  return (
    <React.Fragment>
      <ListItem className={styles["list-item"]}>
        <ListItemText
          primary={text}
          className={styles["list-item-text"]}
        />
      </ListItem>
      <Divider/>
    </React.Fragment>
  )
};

export default ListItemWithText;