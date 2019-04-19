import React, {Fragment} from "react";
import Header from "../homePage/HomePage";

const NotLogged = () => {
  return (
    <Fragment>
      <Header logged={false}/>
      <div className="paddinger">
        <h4 className="red-message">No user is logged in.</h4>
        {/*<Button variant={"contained"} type="submit" className="form-button" onClick={this.logout}>Log in</Button>*/}
      </div>
    </Fragment>
  );
};

export default NotLogged;
