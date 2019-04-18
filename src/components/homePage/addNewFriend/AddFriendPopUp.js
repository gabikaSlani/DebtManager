import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

import "./addNewFriend.css";

const AddFriendPopUp = (props) => {
  const {open, friend, handleClose} = props;
  const friendName = friend ? friend.login : '';

  const handleYes = () => {
    let url = 'http://localhost:9000/home/add/friend/' + props.match.params.id + '/' + friend.id;
    fetch(url)
      .then(res => res.json())
      .then(() => handleClose())
      .catch(err => console.log(err));
  };

  const handleNo = () => {
    handleClose();
  };

  return (

    <Dialog open={open}>
      <DialogTitle>{"Do you want to add a new friend with username: " + friendName + "?"}</DialogTitle>
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