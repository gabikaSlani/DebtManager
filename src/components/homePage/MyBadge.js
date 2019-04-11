import styles from "../loginPage/loginForm.module.css";
import {Error, EuroSymbol, PersonAdd} from "@material-ui/icons";
import {Badge, ClickAwayListener, Grow, IconButton, List, Paper, Popper} from "@material-ui/core";
import React from "react";
import ListItemWithButtons from "./ListItemWithButtons";


class MyBadge extends React.Component {

  constructor(props) {
    super(props);

    const {type} = props;

    this.state = {
      type: type,
      open: false,
      badgeNumber: 2,
      isInvisible: false,
      list: {

      }
    };
  }

  handleToggle = (event) => {
    event.preventDefault();
    this.setState(state => ({open: !state.open}));
    this.setState({badgeNumber: 0});
    this.setState({isInvisible: true});
  };

  handleClose = event => {
    event.preventDefault();
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({open: false});
    // TODO set messages as seen on server
  };

  generate(element) {
    return [0, 1, 2, 3, 4, 5, 6].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  render() {
    const {open, badgeNumber, isInvisible, type} = this.state;

    return (

      <React.Fragment>
        <IconButton color="inherit"
                    buttonRef={node => { this.anchorEl = node; }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}>
          <Badge badgeContent={badgeNumber} color="primary" invisible={isInvisible} className={styles.badge}>
            {type === 'friendship' ? <PersonAdd fontSize="large"/> :
              (type === 'payment' ? <EuroSymbol fontSize="large"/> :
                <Error fontSize="large"/>)
            }
          </Badge>
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} placement="bottom-end" transition>
          {({TransitionProps}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
            >
              <Paper className={styles["badge-paper"]}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <List dense={false} className={styles["list"]}>
                    {this.generate(
                      <ListItemWithButtons messageText='bl jvsodvdo s oisbdvoj scjb osb os obsoi bosb sdo bois i scib siob obo siocb isba' messageType='friendship'/>,
                    )}
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

export default MyBadge;