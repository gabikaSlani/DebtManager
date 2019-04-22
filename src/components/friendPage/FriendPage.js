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
    return (
      <Fragment>
        <Header logged={false}/>
        <UserHeader {...this.props}/>
        <div className="paddinger">
          <ItemList {...this.props}/>
        </div>
      </Fragment>
    );
  }
}

export default FriendPage;