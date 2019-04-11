import React from "react";
import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core";
import styles from "../loginPage/loginForm.module.css";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import MyBadge from "./MyBadge";
import Tabings from "./Tabs";
import AddFriendForm from "./AddFriendForm";

const HomePage = (props) => {
  const {user} = props;

  const logout = () => {
    props.setUser(null);
    props.history.push('/');
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={[styles.appBar, styles.paddinger].join(' ')}>
        <Toolbar className={styles.toolbar}>
          <span className={styles.title}>DEBT MANAGER</span>
          <span className={styles.spacer}></span>
          <IconButton color="inherit" type="submit" onClick={logout}>
            <ExitToApp fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {!user ?
        <div>Nikto nie je prihlaseny</div>
        :
        <div>
          <AppBar position="static" className={[styles.paddinger, styles.appBar1].join(' ')}>
            <Toolbar className={styles.toolbar}>
              <div className={styles["user-info"]}>
                <AccountCircle className={styles.icon}/>
                <div>
                  <div className={styles["user-name"]}>{user}</div>
                  <div className={styles["user-total"]}>-12.45€</div>
                </div>
              </div>
              <span className={styles.spacer}></span>
              <div>
                <MyBadge type="friendship"/>
                <MyBadge type="payment"/>
                <MyBadge type="action"/>
              </div>
            </Toolbar>
          </AppBar>
          <div className={styles.paddinger}>
            <Tabings user={user}/>
            <div className={styles["new-group-and-friend"]}>
              <AddFriendForm/>
              <Button variant={"contained"} className={styles["button-green"]} type="submit">New group</Button>
            </div>
          </div>


        </div>
      }
    </React.Fragment>
  );
}

export default HomePage;