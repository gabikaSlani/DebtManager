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

  constructor(props) {
    super(props);

    this.state = {
      all: [],
      displayed: [],
      open: false,
      dialogUser: null
    };

    this.lastQuery = '';
  };

  componentDidMount() {
    this.fetchNotFriends()
      .then(res => {
      this.setState({all: res});
      this.setState({displayed: res});
    })
  }

  fetchNotFriends = () => {
    let url = 'http://localhost:9000/home/users/' + this.props.match.params.id;
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  searchHandler = (event) => {
    this.lastQuery = event.target.value.toLowerCase();
    this.filterUsers(this.lastQuery);
  };

  filterUsers = (query) => {
    console.log('lst query:' + this.lastQuery);
    console.log('all: displayed:');
    console.log(this.state.all);
    console.log(this.state.displayed);
    let filtered = this.state.all.filter((el) => {
      let searchValue = el.login.toLowerCase();
      return searchValue.indexOf(query) !== -1;
    });
    this.setState({displayed: filtered});
  };

  handleClick = (item) => {
    this.setState({dialogUser: item});
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.fetchNotFriends()
      .then((res) => {
        this.setState({all: res});
        this.setState({displayed: res});
        this.filterUsers(this.lastQuery);
      });
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
          {displayed.length > 0 ?
            <List className="list-add-friend">
              {displayed.map((item, index) =>
                <ListItem key={item.id} id={item.id} button className="item-list-add-friend"
                          onClick={() => this.handleClick(item)}
                >
                  <ListItemIcon><AccountCircle fontSize="large"/></ListItemIcon>
                  <ListItemText primary={item.login}/>
                </ListItem>
              )}
            </List>
            :
            <List className="list-add-friend">
            <span>No users found.</span>
            </List>
          }
        </Paper>
        <AddFriendPopUp open={open} friend={dialogUser} handleClose={this.handleClose} {...this.props}/>
      </Fragment>
    );
  };
};

export default AddFriendForm;