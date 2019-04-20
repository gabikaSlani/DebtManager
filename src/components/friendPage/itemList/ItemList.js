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
    const {items} = this.props;

    return (
      <Paper className="items-paper">
        <List subheader={<ItemListHeader {...this.props}/>} className="items-list">
          {items.map((item, index) =>
            <ItemListItem key={index} item={item}/>
          )}
        </List>
      </Paper>
    );
  }
}

export default ItemList;