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

  setUser = (user) => {
    this.setState({user: user});
  };

  componentDidMount() {
    this.fetchUserInfo();
  };

  reload = () => {
    this.setState({loading: true});
    this.fetchUserInfo();
  };

  fetchUserInfo = () => {
    console.log('zavolala som fetch user info');
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
    console.log('zavolala som fetch user total');
    let url = 'http://localhost:9000/home/total/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({user: {...this.state.user, total: res}})
        this.fetchUserFriends();
      })
      .catch(err => console.log(err))
  };

  fetchUserFriends = () => {
    console.log('zavolala som fetch user friends');
    let url = 'http://localhost:9000/home/friends/' + sessionStorage.getItem('logged');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({user: {...this.state.user, friends: res}})
        this.setState({loading :false})
      })
      .catch(err => console.log(err))
  };

  render() {
    console.log('renderujem');
    console.log(this.state);
    const {user, loading} = this.state;
    return (
      <React.Fragment>
        {loading
          ? <LoginPage/>
          :
          <div className="main-component">
            <HomePage user={user} setUser={this.setUser} {...this.props} reload={this.reload}/>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Home;