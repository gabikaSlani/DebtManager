import React, {Fragment} from "react";
import {Button} from "@material-ui/core";
import FriendsGroupsPaper from "./friendsGroups/FriendsGroupsPaper";
import AddFriendForm from "./addNewFriend/AddFriendForm";
import Header from "../mainComponents/header/Header";
import UserHeader from "../mainComponents/userHeader/UserHeader";

import './homePage.css';
import "../paddinger.css";

const HomePage = (props) => {
  const {user} = props;

  const logout = () => {
    props.setUser(null);
    props.history.push('/');
  };

  return (
    <Fragment>
      <Header logged={true} logout={logout}/>
      {!user ?
        <div>Nikto nie je prihlaseny</div>
        :
        <div>
          <UserHeader user={user}/>
          <div className="paddinger">
            <FriendsGroupsPaper user={user}/>
            <div className="new-group-and-friend">
              <AddFriendForm/>
              <Button variant={"contained"} className="button-orange" type="submit">New group</Button>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default HomePage;