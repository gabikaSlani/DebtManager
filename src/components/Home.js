import React, {Component} from "react";
import HomePage from "./homePage/HomePage";
import './App.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {user: null};
    console.log(this.props);
  }

  setUser = (userName) => {
    this.setState({user: userName});
  }

  componentDidMount() {
    this.setUser(this.props.match.params.id);
  }

  render() {
    const {user} = this.state;
    return (
      <div className="Home">
        <HomePage user={user} setUser={this.setUser} {...this.props}/>
      </div>
    );
  }
}

export default Home;