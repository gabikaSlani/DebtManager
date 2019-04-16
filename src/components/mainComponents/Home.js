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

  setUser = (userName) => {
    this.setState({user: userName});
  };

  componentDidMount() {
    fetch('http://localhost:9000/home/:id')
      .then(res => res.json())
      //TODO chytit zo servera celeho usera a vlozit do stavu
      .then(res => console.log(res))
      .catch(err => err);
    this.setUser(this.props.match.params.id);
  };

  render() {
    const {user} = this.state;
    return (
      <div className="main-component">
        <HomePage user={user} setUser={this.setUser} {...this.props}/>
      </div>
    );
  }
}

export default Home;