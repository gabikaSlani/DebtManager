import {ListItem, ListItemIcon} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import React from "react";

import "./friendsGroups.css";

const FriendListItem = (props) => {

  const {index, friend} = props;
  return (
    <ListItem key={index} button className="list-item-friends-groups">
      <ListItemIcon>
        <AccountCircle className="list-item-icon-friends-groups"/>
      </ListItemIcon>
      <div>
        <div className="list-name-friends-groups">{friend.login}</div>
        {friend.debt == 0 ?
          <div className="list-total-friends-groups settled">settled up</div>
          : (friend.debt < 0
              ? <div className="list-total-friends-groups minus-amount">you owe {friend.debt.substr(1)}€</div>
              : <div className="list-total-friends-groups plus-amount">owes you {friend.debt}€</div>
          )
        }
      </div>
    </ListItem>
  );
};

export default FriendListItem;
