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
    const {user} = this.props;

    return (
      <Paper className="items-paper">
        <List subheader={<ItemListHeader user={user}/>} className="items-list">
          <ItemListItem/>
          <ItemListItem/>
          <ItemListItem/>
          <ItemListItem/><ItemListItem/><ItemListItem/><ItemListItem/><ItemListItem/><ItemListItem/>


        </List>
      </Paper>
    );
  }
}

export default ItemList;