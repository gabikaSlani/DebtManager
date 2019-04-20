import React, {Component} from 'react';
import FriendPage from "../friendPage/FriendPage";
import './mainComponents.css';
import LoadingPage from "./LoadingPage";

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
      logged: false,
      isFriend: false
    };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  reload(){
    this.setState({loading: true});
    this.fetchUserInfo();
  };

  fetchUserInfo = () => {
    let url = 'http://localhost:9000/home/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({user: {...this.state.user, info: res[0]}})
        this.fetchUserTotal();
      })
      .catch(err => console.log(err));
  };

  fetchUserTotal = () => {
    let url = 'http://localhost:9000/home/total/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({user: {...this.state.user, total: res}});
        this.fetchUserFriends();
      })
      .catch(err => console.log(err))
  };

  fetchUserFriends = () => {
    let url = 'http://localhost:9000/home/friends/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({user: {...this.state.user, friends: res}});
        this.fetchFriendInfo();
      })
      .catch(err => console.log(err))
  };

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
        this.setDebt();
        this.setState({loading: false});
      })
      .catch(err => console.log(err))
  };

  getFriendFromUrl = () => {
    const friend = this.state.user.friends.filter(friend => {
      return friend.id === this.friendId
    })[0];
    return friend;
  };

  setDebt = () => {
    const friend = this.getFriendFromUrl();
    this.setState({debt: friend.debt})
  };

  render() {
    const {loading, user, friend, debt, items} = this.state;
    return (
      <React.Fragment>
        {loading
          ? <LoadingPage/>
          :
          <div className="main-component">
            <FriendPage user={user} friend={friend} debt={debt} items={items} reload={this.reload}/>
          </div>
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


// reload = () => {
//   this.setState({loading: true, user:null});
//   this.fetchUserInfo();
// };
//
//
// getStateFromLocation = async () => {
//   await this.setState({receivedState: this.props.location.state});
// };
//
// componentDidMount() {
//   this.getStateFromLocation()
//     .then(() => {
//       if (this.state.receivedState) {
//         this.setState({user: this.state.receivedState.user});
//         this.fetchFriendInfo();
//         this.setDebt();
//       }
//       else{
//           this.setState({loading: false})
//       }
//     })
//     .catch((err => console.log(err))
//   )
// }