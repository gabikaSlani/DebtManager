import React from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import Notification from "../../homePage/notifications/Notification";

import "./userHeader.css";
import "../../paddinger.css";

const UserHeader = (props) => {
  const total = "12.45€";
  const {user} = props;
  return (
    <AppBar position="static" className="appBar-user paddinger">
      <Toolbar className="toolbar">
        <div className="user-info">
          <AccountCircle className="user-icon"/>
          <div>
            <div className="user-name">{user.info.login}</div>
            <div className="user-total">{total}</div>
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