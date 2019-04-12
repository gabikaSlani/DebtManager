import React, {Component, Fragment} from 'react';
import {
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import {AccountCircle, Search} from "@material-ui/icons";
import AddFriendPopUp from "./AddFriendPopUp";

import "./addNewFriend.css";


class AddFriendForm extends Component {

  state = {
    all: [{name: 'Johny'}, {name: 'Tom'}, {name: 'Sarah'}, {name: 'Tommy'}, {name: 'Stefan'}, {name: 'Lukas'},
      {name: 'Izabell'}, {name: 'Elen'}, {name: 'Paul'}],
    displayed: [],
    open: false,
    dialogUser: null
  };

  searchHandler = (event) => {
    let query = event.target.value.toLowerCase();
    let filtered = this.state.all.filter((el) => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(query) !== -1;
    });
    this.setState({displayed: filtered});
  };

  handleClick = (item) => {
    this.setState({dialogUser: item.name});
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {displayed, dialogUser, open} = this.state;

    return (
      <Fragment>
        <Paper className="form-add-friend">
          <Typography className="title-add-friend">ADD NEW FRIEND</Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
            onChange={this.searchHandler}
            className="input-form-add-friend"
          />
          <List className="list-add-friend">
            {displayed.map((item, index) =>
              <ListItem key={item.name} id={item.name} button className="item-list-add-friend"
                        onClick={() => this.handleClick(item)}
              >
                <ListItemIcon><AccountCircle fontSize="large"/></ListItemIcon>
                <ListItemText primary={item.name}/>
              </ListItem>
            )}
          </List>
        </Paper>
        <AddFriendPopUp open={open} username={dialogUser} handleClose={this.handleClose}/>
      </Fragment>
    );
  };
};

export default AddFriendForm;