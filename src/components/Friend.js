import React from 'react';

class Friend extends React.Component{

  state={
    userId: this.props.match.userId,
    friendId: this.props.match.friendId
  };

  render(){
    const {userId, friendId} = this.state;
    return(
      <div>
        <p>{userId}</p>
        <p>{friendId}</p>
      </div>
    );
  };
}

export default Friend;