import React, {Component} from 'react';
import {List, Paper} from "@material-ui/core";
import ItemListHeader from "./ItemListHeader";
import ItemListItem from "./ItemListItem";

import './itemList.css';

class ItemList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {friend, debt, items} = this.props;

    return (
      <Paper className="items-paper">
        <List subheader={<ItemListHeader friend={friend} debt={debt}/>} className="items-list">
          {items.map((item, index) =>
            <ItemListItem key={index} item={item}/>
          )}
        </List>
      </Paper>
    );
  }
}

export default ItemList;