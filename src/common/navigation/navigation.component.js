import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./navigation.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  openMenuHandler() {
    const closed = !this.state.isOpen;
    this.setState({ isOpen: closed });
  }

  render() {
    const renderOverlay = (
      <nav
        className={
          this.state.isOpen ? "navigation navigation--active" : "navigation"
        }
      >
        <h3 className="navigation--active__title">General</h3>
        <ul className="navigation__links">
          {this.props.links.map(link => {
            return (
              <NavLink
                exact
                key={link.id}
                className={`navigation__links--link ${link.className}`}
                to={link.path}
                onClick={this.openMenuHandler.bind(this)}
              >
                {link.title}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    );
    return (
      <>
        {this.state.isOpen ? (
          <div
            onClick={this.openMenuHandler.bind(this)}
            className="with-overlay"
          />
        ) : null}
        <div
          className={this.state.isOpen ? "burger burger--active" : "burger"}
          onClick={this.openMenuHandler.bind(this)}
        >
          <span className="burger__icon" />
        </div>

        {renderOverlay}
      </>
    );
  }
}
export default connect(
  null,
  { push }
)(Sidebar);
