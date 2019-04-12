import React from 'react';
import './mainComponents.css';
import '../paddinger.css';
import Header from "./header/Header";

const NotFound = () => {
  return (
    <div className="main-component">
      <Header logged={false}/>
      <div className="paddinger">
        <h4 className="not-found">Page is not found.</h4>
      </div>
    </div>
  );
};

export default NotFound;