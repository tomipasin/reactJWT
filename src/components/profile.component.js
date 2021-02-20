import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    //console.log(currentUser)

    return (
      <div className="container">
        <header className="jumbotron shadow bccard">
          
          <div className='centerDiv center'>
            <img className='profilePic shadow round' src={currentUser.picture}/>
          </div>
          
          <h3>
           This is your profile, <strong>{currentUser.username}</strong> 
          </h3>

          <p>
          <strong>Here are some parts of your JWT Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Your MongoDB Id is:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>The email you declared is:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>And here you are set unde this role:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
          
        </header>
       
      </div>
    );
  }
}