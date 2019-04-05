import React, {Component} from 'react';
import './App.css';
import LoginPage from "./components/loginPage/LoginPage"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {user: null};
  }

  setUser = (userName) => {
    this.setState({user: userName});
  }

  // callAPI(){
  //   fetch('http://localhost:9000/login')
  //     .then(res => res.text())
  //     .then(res => this.setState({apiResponse: res}))
  //     .catch(err => err);
  // }

  componentDidMount() {
    // this.callAPI();
  }

  render() {
    const {user} = this.state;
    return (
      <div className="App">
        <LoginPage user={user} setUser={this.setUser} {...this.props}/>
      </div>
    );
  }
}

export default App;
