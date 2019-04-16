import React from 'react';
import './mainComponents.css';
import '../paddinger.css';
import Header from "./header/Header";

const ErrorPage = () => {
  return (
    <div className="main-component">
      <Header logged={false}/>
      <div className="paddinger">
        <h4 className="not-found">Something went wrong.</h4>
      </div>
    </div>
  );
};

export default ErrorPage;