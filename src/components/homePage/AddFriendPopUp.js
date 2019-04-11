import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import styles from "../loginPage/loginForm.module.css";

const AddFriendPopUp = (props) => {
  const {open, username, handleClose} = props;
  console.log("prijate userName:" + username);

  const handleYes = () => {
    //TODO pridaj kamosa na serveri
    handleClose();
  };

  const handleNo = () => {
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{"Do you want to add a new friend with username: " + username + "?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleYes} className={styles["button-yes"]} autoFocus>
          Yes
        </Button>
        <Button onClick={handleNo} className={styles["button-no"]}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendPopUp;