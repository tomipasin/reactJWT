import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <>
      <div className="container">
        <header className="jumbotron center shadow bccard">
        <div className='centerDiv center'>
            <img className='profilePic shadow round' src="https://avatars.githubusercontent.com/u/33010390?s=460&v=4"/>
          
          </div>
          <br/>
          {/* <h3>{this.state.content}</h3> */}
          <h4>Thanks by access this</h4>
        <h3>NodeJS + MongoDB + ReactJS</h3>
         <h4>system to download my CV.</h4> 
         <hr></hr>
          <h6>Follow this steps to download my CV:</h6>
            <ol className="left">
              <li>Sign up by creating an user and password;</li>
              <li>Log in;</li>
              <li>Click on "Download my CV" menu and choose the language you want.</li>

            </ol>
          
        </header>
        
      </div>

      

      </>
    );
  }
}