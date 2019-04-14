import React, {Component, Fragment} from "react";
import {Button, ListSubheader} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import AddItemPupUp from "../addItemPopUp/AddItemPupUp";

import './itemList.css';

class ItemListHeader extends Component {

  state = {open: false}

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {user} = this.props;
    const {open} = this.state;
    return (
      <Fragment>
        <ListSubheader className="items-list-header">
          <div className="items-friend-info">
            <AccountCircle className="friend-icon"/>
            <div>
              <div className="friend-name">{user}</div>
              <div className="friend-total">owes you 32.42€</div>
            </div>
          </div>
          <span className="spacer"/>
          <div className="items-list-header-buttons">
            <Button className="button-green" onClick={this.handleClick}>Add item</Button>
            <Button className="button-orange">Settle up</Button>
          </div>
        </ListSubheader>
          <AddItemPupUp open={open} handleClose={this.handleClose} chips={false}/>
      </Fragment>
    );
  }
}

export default ItemListHeader;