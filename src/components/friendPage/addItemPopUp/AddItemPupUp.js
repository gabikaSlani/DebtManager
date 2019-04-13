import React, {Component} from 'react';
import {Dialog, DialogTitle} from "@material-ui/core";

import "./addItemPopUp.css";
import "../itemList/itemList.css";
import NewItemForm from "../../createForms/NewItemForm";

class AddItemPupUp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {open, handleClose, chips} = this.props;
    return (
      <Dialog open={open} onClose={handleClose} className="add-new-item-dialog">
        <div className="add-new-item-paper">
          <DialogTitle className="add-new-item-title">{"Add new item"}</DialogTitle>
          <NewItemForm chips={chips} handleClose={handleClose}/>
        </div>
      </Dialog>
    );
  }
}

export default AddItemPupUp;