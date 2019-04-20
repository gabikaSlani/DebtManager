import React, {Component, Fragment} from 'react';
import Header from "../mainComponents/header/Header";
import UserHeader from "../mainComponents/userHeader/UserHeader";
import ItemList from "./itemList/ItemList";

import "../paddinger.css";

class FriendPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props;
    console.log('friend page');
    console.log(user);
    return (
      <Fragment>
        <Header logged={false}/>
        <UserHeader user={user}/>
        <div className="paddinger">
          <ItemList {...this.props}/>
        </div>
      </Fragment>
    );
  }
}

export default FriendPage;