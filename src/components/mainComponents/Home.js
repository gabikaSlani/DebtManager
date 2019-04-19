import React, {Component} from "react";
import HomePage from "../homePage/HomePage";
import './mainComponents.css';
import LoginPage from "./LoadingPage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  setUserInfo = (userInfo) => {
    this.setState({user: {...this.state.user, info: userInfo}})
  };

  setUserTotal = (userTotal) => {
    this.setState({user: {...this.state.user, total: userTotal}})
  };

  setUserFriends = (userFriends) => {
    this.setState({user: {...this.state.user, friends: userFriends}})
  };

  setUser = (user) => {
    this.setState({user: user});
  };

  componentDidMount() {
    this.fetchUserInfo();
  };

  fetchUserInfo = () => {
    let url = 'http://localhost:9000/home/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setUserInfo(res[0]);
        this.fetchUserTotal();
      })
      .catch(err => console.log(err));
  };

  fetchUserTotal = () => {
    let url = 'http://localhost:9000/home/total/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setUserTotal(res);
        this.fetchUserFriends();
      })
      .catch(err => console.log(err))
  };

  fetchUserFriends = () => {
    let url = 'http://localhost:9000/home/friends/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setUserFriends(res)
        this.setState({loading :false})
      })
      .catch(err => console.log(err))
  };

  render() {
    const {user, loading} = this.state;
    return (
      <React.Fragment>
        {loading
          ? <LoginPage/>
          :
          <div className="main-component">
            <HomePage user={user} setUser={this.setUser} {...this.props}/>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Home;