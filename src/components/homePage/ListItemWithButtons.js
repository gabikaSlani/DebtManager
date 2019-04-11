import React from 'react';
import styles from "../loginPage/loginForm.module.css";
import {Divider, IconButton, ListItem, ListItemText} from "@material-ui/core";
import {Cancel, CheckCircle} from "@material-ui/icons";
import ListItemWithText from "./ListItemWithText";

class ListItemWithButtons extends React.Component {

  constructor(props) {
    super(props);

    const {messageType, messageText} = props;

    this.state = {
      type: messageType,
      text: messageText,
      clicked: false
    }
  };

  accept = () => {
    console.log('typ' + this.state.type);
    const messageText = (this.state.type === 'friendship')
      ? 'akcetovane priatelstvo'
      : 'potvrdena platba';
    this.setState({text: messageText});
    this.setState({clicked: true});

    //TODO nastav na serveri
  };

  reject = () => {
    const messageText = (this.state.type === 'friendship')
      ? 'neakceptovane priatelstvo'
      : 'nepotvrdena platba';
    this.setState({text: messageText});
    this.setState({clicked: true});

    //TODO nastav na serveri
  };

  render() {
    const {text, clicked} = this.state;
    return (
      <React.Fragment>
        {clicked ?
          <ListItemWithText text={text}/>
          :
          <React.Fragment>
            <ListItem className={styles["list-item"]}>
              <ListItemText
                primary={text}
                className={styles["list-item-text"]}
              />
              <div className={styles["list-item-buttons"]}>
                <IconButton aria-label="Check" className={styles["list-item-button"]} onClick={this.accept}>
                  <CheckCircle/>
                </IconButton>
                <IconButton aria-label="Delete" className={styles["list-item-button"]} onClick={this.reject}>
                  <Cancel/>
                </IconButton>
              </div>
            </ListItem>
            <Divider/>
          </React.Fragment>
        }
      </React.Fragment>
    );
  };
}

export default ListItemWithButtons;