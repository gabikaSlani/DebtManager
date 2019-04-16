import React, {Component, Fragment} from "react";
import {Button} from "@material-ui/core";
import FriendsGroupsPaper from "./friendsGroups/FriendsGroupsPaper";
import AddFriendForm from "./addNewFriend/AddFriendForm";
import Header from "../mainComponents/header/Header";
import UserHeader from "../mainComponents/userHeader/UserHeader";
import AddItemPupUp from "../friendPage/addItemPopUp/AddItemPupUp";

import './homePage.css';
import "../paddinger.css";


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

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    console.log('session' + window.sessionStorage.getItem('logged'));
    const {user, setUser} = this.props;
    const {open} = this.state;
    return (
      <Fragment>
        {!(user && window.sessionStorage.getItem('logged'))
          ?
          <Fragment>
            <Header logged={false}/>
            <div className="paddinger">
              <h4 className="red-message">No user is logged in.</h4>
              <Button variant={"contained"} type="submit" className="form-button" onClick={this.logout}>Log in</Button>
            </div>
          </Fragment>
          :
          <div>
            <Header logged={true} logout={this.logout}/>
            <UserHeader user={user}/>
            <div className="paddinger">
              <FriendsGroupsPaper user={user} setUser={setUser}/>
              <div className="new-group-and-friend">
                <AddFriendForm/>
                <div className="new-item-group-buttons">
                  <Button
                    variant={"contained"}
                    className="new-button new-item-btn"
                    type="submit"
                    onClick={this.handleClick}>
                    New item
                  </Button>
                  <span className="spacer"/>
                  <Button variant={"contained"} className="new-button new-group-btn" type="submit">New group</Button>
                </div>
              </div>
            </div>
            <AddItemPupUp open={open} handleClose={this.handleClose} chips={true}/>
          </div>
        }
      </Fragment>
    );
  }
};

export default HomePage;