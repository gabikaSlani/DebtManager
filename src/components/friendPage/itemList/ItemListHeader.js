import React, {Component, Fragment} from "react";
import {Button, ListSubheader} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import AddItemPupUp from "../addItemPopUp/AddItemPupUp";

import './itemList.css';

class ItemListHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  addItem = () => {
    this.setState({open: true});
  };

  settleUp = () => {
    const {friend, reload, user} = this.props;
    let url = 'http://localhost:9000/friend/settle/up/' + user.info.id + '/' + friend.id;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        reload();
      })
      .catch(err => console.log(err))
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {friend, debt} = this.props;
    const {open} = this.state;
    const debtFloat = parseFloat(debt);
    return (
      <Fragment>
        <ListSubheader className="items-list-header">
          <div className="items-friend-info">
            <AccountCircle className="friend-icon"/>
            <div>
              <div className="friend-name">{friend.login}</div>
              {debtFloat === 0
                ? <div className="friend-total settled">settled up</div>
                : (debtFloat < 0
                    ? <div className="friend-total minus-amount">you owe {debtFloat*(-1).toFixed(2)}€</div>
                    : <div className="friend-total plus-amount">owes you {debtFloat.toFixed(2)}€</div>
                )
              }
            </div>
          </div>
          <span className="spacer"/>
          <div className="items-list-header-buttons">
            <Button className="button-green" onClick={this.addItem}>Add item</Button>
            <Button className="button-orange" onClick={this.settleUp}>Settle up</Button>
          </div>
        </ListSubheader>
          <AddItemPupUp open={open} handleClose={this.handleClose} chips={false} {...this.props}/>
      </Fragment>
    );
  }
}

export default ItemListHeader;