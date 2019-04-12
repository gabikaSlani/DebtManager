import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

import "./addNewFriend.css";

const AddFriendPopUp = (props) => {
  const {open, username, handleClose} = props;

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
        <Button onClick={handleYes} className="button-yes" autoFocus>
          Yes
        </Button>
        <Button onClick={handleNo} className="button-no">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendPopUp;