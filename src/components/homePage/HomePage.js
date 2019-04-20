import React, {Component, Fragment} from "react";
import {Button} from "@material-ui/core";
import FriendsGroupsPaper from "./friendsGroups/FriendsGroupsPaper";
import AddFriendForm from "./addNewFriend/AddFriendForm";
import Header from "../mainComponents/header/Header";
import UserHeader from "../mainComponents/userHeader/UserHeader";
import AddItemPupUp from "../friendPage/addItemPopUp/AddItemPupUp";

import './homePage.css';
import "../paddinger.css";
import NotLogged from "../mainComponents/NotLogged";


class HomePage extends Component {

  state = {open: false};

  constructor(props) {
    super(props);
  }

  logout = () => {
    this.props.setUser(null);
    window.sessionStorage.removeItem('logged');
    this.props.history.push('/');
  };

  newItem = () => {
    this.setState({open: true});
  };

  newGroup = () => {};

  handleClose = () => {
    this.setState({open: false});
  };

  loggedUserIdInUrl = () => {
    return this.props.match.params.id === window.sessionStorage.getItem('logged');
  };

  render() {
    const {user, reload} = this.props;
    const {open} = this.state;
    return (
      <Fragment>
        {user && this.loggedUserIdInUrl()
          ?
          <div>
            <Header logged={true} logout={this.logout}/>
            <UserHeader user={user}/>
            <div className="paddinger">
              <FriendsGroupsPaper user={user}/>
              <div className="new-group-and-friend">
                <AddFriendForm {...this.props}/>
                <div className="new-item-group-buttons">
                  <Button
                    variant={"contained"}
                    className="new-button new-item-btn"
                    type="submit"
                    onClick={this.newItem}>
                    New item
                  </Button>
                  <span className="spacer"/>
                  <Button
                    variant={"contained"}
                    className="new-button new-group-btn"
                    type="submit"
                    onClick={this.newGroup}>
                    New group
                  </Button>
                </div>
              </div>
            </div>
            <AddItemPupUp open={open} handleClose={this.handleClose} chips={true} friends={user.friends} reload={reload}/>
          </div>
          :
          <NotLogged />
        }
      </Fragment>
    );
  }
};

export default HomePage;