import React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import styles from "../loginPage/loginForm.module.css";
import {Group} from "@material-ui/icons";

class GroupList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {name: 'Toms gift', debt: 1.28},
        {name: 'Trip', debt: 15.45},
        {name: 'Mom birthday', debt: 56.00}]
    };
  }

  render() {
    const {list} = this.state;
    return (
      <List dense={false} className={styles["list-tabs"]}>
        {list.map((item, index) =>
          <ListItem key={index}>
            <ListItemIcon><Group fontSize="large"/></ListItemIcon>
            <ListItemText primary={item.name} secondary={item.debt} />
          </ListItem>
        )}
      </List>
    );
  }
}

export default GroupList;