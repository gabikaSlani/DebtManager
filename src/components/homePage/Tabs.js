import React from 'react';
import {Paper, Tab, Tabs} from "@material-ui/core";
import {AccountCircle, Group} from "@material-ui/icons";
import styles from "../loginPage/loginForm.module.css";
import FriendList from "./FriendList";
import GroupList from "./GroupList";

class Tabings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({value: value});
  };

  render() {
    const {value} = this.state;
    const {user} = this.props;

    return (
      <Paper className={styles["paper-tabs"]}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          variant="fullWidth"
          className={styles.tabs}
          indicatorColor="primary"
        >
          <Tab icon={<AccountCircle/>} label="Friends"/>
          <Tab icon={<Group/>} label="Groups"/>
        </Tabs>
        {value === 0 && <FriendList user={user}/>}
        {value === 1 && <GroupList/>}
      </Paper>
    );
  }
}

export default Tabings;