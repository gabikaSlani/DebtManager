import React, {Component} from 'react';
import FriendPage from "../friendPage/FriendPage";
import './mainComponents.css';

class Friend extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userId: this.props.match.params.userId,
      friendId: this.props.match.params.friendId
    };
  }



  render() {
    const {userId, friendId} = this.state;
    return (
        <div className="main-component">
          <FriendPage user={userId}/>
        </div>
    );
  };
}

export default Friend;