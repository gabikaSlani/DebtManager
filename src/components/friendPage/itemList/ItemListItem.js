import React, {Component, Fragment} from 'react';
import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Image} from "@material-ui/icons";

import './itemList.css';

class ItemListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    return (
      <Fragment>
        <ListItem className="items-list-item">
          <ListItemIcon>
            <Image className="image-icon"/>
          </ListItemIcon>
          <ListItemText primary={item.name} secondary={item.creator_id + ' paid ' + item.amount} className="items-list-item-text"/>
          <div className="spacer"/>
          <ListItemText primary={item.amount} className="items-list-item-right-text"/>
        </ListItem>
        <Divider/>
      </Fragment>
    );
  }
}

export default ItemListItem;