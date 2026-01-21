import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  isMobile(){
    return window.innerWidth < 768;
  }

  toggleMenu(){
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    const showMenu = this.state.showMenu;
    const isMobile = this.isMobile();
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className={"container" + (this.isMobile() ? " navbarContainerMobile" : "")}>
            <NavLink className="navbar-brand" to="/">
              Alex Markules
            </NavLink>
            <button className={"navbar-toggler" + (this.isMobile() ? " displayToggle" : "")} type="button" onClick={this.toggleMenu}>
              <span className="navbar-toggler-icon"></span>
            </button>
            { (showMenu || !isMobile) && (
            <div className="collapse navbar-collapse" >
              <ul className={"navbar-nav ml-auto" + (this.isMobile() ? " mobileMenuUl" : "")}>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blog">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/resume">
                    Resume
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects">
                    Projects
                  </NavLink>
                </li>
              </ul>
            </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;