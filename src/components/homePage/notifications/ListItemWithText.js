import React, {Fragment} from 'react';
import {Divider, ListItem, ListItemText} from "@material-ui/core";

import "./notifications.css";

const ListItemWithText = (props) => {

  const {text} = props;

  return (
    <Fragment>
      <ListItem className="notification-list-item">
        <ListItemText
          primary={text}
          className="notification-list-item-text"
        />
      </ListItem>
      <Divider/>
    </Fragment>
  )
};

export default ListItemWithText;