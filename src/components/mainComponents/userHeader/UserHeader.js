import React from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import Notification from "../../homePage/notifications/Notification";

import "./userHeader.css";
import "../../paddinger.css";

const UserHeader = (props) => {
  const {user} = props;
  return (
    <AppBar position="static" className="appBar-user paddinger">
      <Toolbar className="toolbar">
        <div className="user-info">
          <AccountCircle className="user-icon"/>
          <div>
            <div className="user-name">{user.info.login}</div>
            {user.total == 0
              ? <div className="user-total settled">{user.total}€</div>
              : (user.total < 0
                  ? <div className="user-total minus-amount">{user.total}€</div>
                  : <div className="user-total plus-amount">+{user.total}€</div>
              )
            }
          </div>
        </div>
        <span className="spacer"/>
        <div>
          <Notification type="friendship"/>
          <Notification type="payment"/>
          <Notification type="action"/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;