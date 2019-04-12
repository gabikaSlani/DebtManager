import React, {Component} from 'react';
import './mainComponents.css';
import Header from "./header/Header";

class Friend extends Component {

  state = {
    userId: this.props.match.userId,
    friendId: this.props.match.friendId
  };

  render() {
    const {userId, friendId} = this.state;
    return (
      <div className="main-component">
        <Header logged={false} >
          <p>{userId}</p>
          <p>{friendId}</p>
        </Header>
      </div>
    );
  };
}

export default Friend;