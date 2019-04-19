import React, {Component} from 'react';
import FriendPage from "../friendPage/FriendPage";
import './mainComponents.css';
import LoadingPage from "./LoadingPage";
import NotFound from "./NotFound";

class Friend extends Component {

  friendId = parseInt(this.props.match.params.friendId);
  userId = this.props.match.params.userId;

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      friend: null,
      items: [],
      debt: null,
      loading: true,
      receivedState: null
    };
  }

  getStateFromLocation = async () => {
    await this.setState({receivedState: this.props.location.state});
  };

  componentDidMount() {
    this.getStateFromLocation()
      .then(() => {
        if (this.state.receivedState) {
          this.setState({user: this.state.receivedState.user});
          this.fetchFriendInfo();
          this.setDebt();
        }
        else{
        this.setState({loading: false})
        }
      })
      .catch((err => console.log(err))
    )
  }

  fetchFriendInfo = () => {
    let url = 'http://localhost:9000/friend/' + this.friendId;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({friend: res[0]});
        this.fetchItems();
      })
      .catch(err => console.log(err));
  };

  fetchItems = () => {
    let url = 'http://localhost:9000/friend/items/' + this.userId + '/' + this.friendId;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({items: res});
        this.setState({loading: false});
      })
      .catch(err => console.log(err))
  };

  setDebt = () => {
    const friend = this.state.user.friends.filter(friend => {return friend.id === this.friendId})[0];
    this.setState({debt: friend.debt});
  };

  render() {
    const {loading, user, friend, receivedState, debt, items} = this.state;
    console.log(items);
    return (
      <React.Fragment>
        {loading
          ? <LoadingPage/>
          : (!receivedState
              ? <NotFound/>
              :
              <div className="main-component">
                <FriendPage user={user} friend={friend} debt={debt} items={items}/>
              </div>
          )
        }
      </React.Fragment>
    );
  };
}

export default Friend;

// checkUrl = async () => {
//   const userId = this.props.match.params.userId;
//   const friendId = this.props.match.params.friendId;
//   const logged = (userId === sessionStorage.getItem('logged'));
//   await this.setState({logged: logged});
//   const isFriend = (this.state.user.friends.filter(friend => {
//     return friend.id == friendId
//   })).length > 0;
//   await this.setState({isFriend: isFriend});
// };
//
// componentDidMount() {
//   this.getUserFromLocation()
//     .then(() => this.checkUrl()
//       .then(() => this.setState({loading: false})));
// }
//
// render() {
//   const {loading, user, friend, isFriend, logged} = this.state;
//   return (
//     <React.Fragment>
//       {loading
//         ? <LoadingPage/>
//         : (!logged
//             ? <NotLogged/>
//             : (!isFriend
//                 ? <NotFound/>
//                 :
//                 <div className="main-component">
//                   <FriendPage user={user}/>
//                 </div>
//             )
//         )
//       }
//     </React.Fragment>
//   );
// };