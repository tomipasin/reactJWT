import React, { Component } from "react";
import { Document, Page } from 'react-pdf'


import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron shadow bccard">
        <h4>English version:</h4>
          <div class="embed-responsive embed-responsive-4by3">
            <iframe class="embed-responsive-item" src="https://tomipasin.com/cv/EuroCV___EN___V3.pdf" allowfullscreen></iframe>
          </div>
            <hr></hr>
            <p></p>
            
            <h4>Versão em português:</h4>
            <p></p>
          <div class="embed-responsive embed-responsive-4by3">
            <iframe class="embed-responsive-item" src="https://tomipasin.com/cv/EuroCV_PT_V7.pdf" allowfullscreen></iframe>
          </div>

        </header>
      </div>
    );
  }
}