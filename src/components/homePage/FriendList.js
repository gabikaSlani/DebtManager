import React from 'react';
import {Link, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import styles from "../loginPage/loginForm.module.css";
import {Link as RouterLink} from 'react-router-dom';

class FriendList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: [
        {id: 11, name: 'Miska', debt: 12.28},
        {id: 12, name: 'Tom', debt: -15.14},
        {id: 13, name: 'Sara', debt: 50.00},
        {id: 14, name: 'Tom', debt: -10.0},
        {id: 15, name: 'Johny', debt: 5.00},
        {id: 16, name: 'Paul', debt: -28.02},
        {id: 17, name: 'Miki', debt: 83.04},
        ]
    };
  }

  render() {
    const {friendList} = this.state;
    const {user} = this.props;
    return (
      <List dense={false} className={styles["list-tabs"]}>
          {friendList.map((friend, index) =>
              <Link
                key={index}
                component={RouterLink}
                to={"/friend/"+user+"/"+friend.id}
                className={styles["list-item-link-tabs"]}
              >
                <ListItem key={index} button className={styles["list-item-tabs"]}>
                  <ListItemIcon><AccountCircle fontSize="large"/></ListItemIcon>
                  <ListItemText primary={friend.name} secondary={friend.debt} />
                </ListItem>
              </Link>
          )}
      </List>
    );
  }
}

export default FriendList;