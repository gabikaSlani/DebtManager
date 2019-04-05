import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import styles from "../loginPage/loginForm.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle"

const HomePage = (props) => {
  const {user} = props;

  const logout = () => {
    props.setUser(null);
    props.history.push('/');
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={styles["app-bar"]}>
        <Toolbar className={styles.toolbar}>
          <h1 className={styles.title}>DEBT MANAGER</h1>
        </Toolbar>
      </AppBar>
      {!user ?
        <div>Nikto nie je prihlaseny</div>
        :
        <div>
          <AppBar position="static" className={styles["app-bar1"]}>
            <Toolbar className={styles.toolbar}>
              <AccountCircle className={styles.icon} fontSize="large"/>
              <h2>{user}</h2>
              <button onClick={logout}>Log out</button>
            </Toolbar>
          </AppBar>
          <div className={styles["align-center"]}>
          </div>

        </div>
      }
    </React.Fragment>
  );
}

export default HomePage;