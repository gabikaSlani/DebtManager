import React, {Component} from "react";
import HomePage from "../homePage/HomePage";
import './mainComponents.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  setUserInfo = (userInfo) => {
    this.setState({user: {info: userInfo}})
  };

  setUser = (user) => {
    this.setState({user: user});
  };

  componentDidMount() {
    console.log('mountujem');
    let url = 'http://localhost:9000/home/' + this.props.match.params.id;
    fetch(url)
      .then(res => res.json())
      .then(res => this.setUserInfo(res[0]))
      .catch(err => console.log(err));
  };

  render() {
    console.log('renderujem');
    const {user} = this.state;
    return (
      <div className="main-component">
        <HomePage user={user} setUser={this.setUser} {...this.props}/>
      </div>
    );
  }
}

export default Home;