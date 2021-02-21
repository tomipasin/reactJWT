import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        {/* <Router basename={"/login"}></Router> */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

          <h2 class="navbar-brand titulo">
          <Link to={"/login/"} className="nav-link titulo">Tomi's login app</Link></h2>


          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li className="nav-item">
                <Link to={"/login/"} className="nav-link">
                  Home
              </Link>
              </li>
              
                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/login/mod"} className="nav-link">
                      Moderator Board
                </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/login/admin"} className="nav-link">
                      Admin Board
                </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/login/user"} className="nav-link">
                      Download my CV
                </Link>
                  </li>
                )}

                {currentUser ? (
                  <div className="navbar-nav">
                    <li className="nav-item">
                      <Link to={"/login/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Logout
                </a>
                    </li>
                  </div>
                ) : (
                    <>
                      <li className="nav-item">
                        <Link to={"/login/login"} className="nav-link">
                          Login
                </Link>
                      </li>

                      <li className="nav-item">
                        <Link to={"/login/register"} className="nav-link">
                          Sign Up
                </Link>
                      </li>
                    </>
                  )}
              </ul>
          </div>
        </nav>

       

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/login/", "/login/home"]} component={Home} />
            <Route exact path="/login/login" component={Login} />
            <Route exact path="/login/register" component={Register} />
            <Route exact path="/login/profile" component={Profile} />
            <Route path="/login/user" component={BoardUser} />
            <Route path="/login/mod" component={BoardModerator} />
            <Route path="/login/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;