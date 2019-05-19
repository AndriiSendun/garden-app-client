import React, { Component } from "react";
import Sidebar from "../navigation/navigation.component";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";

import LogOut from "../../pages/authorization/log-out/log-out.component";

import routes from "../../constants/routes";

import "./header.scss";

class Header extends Component {
  render() {
    const links = [
      {
        title: "Dashboard",
        path: routes.dashboard,
        id: "dashboard",
        className: ""
      },
      {
        title: "Create flower",
        path: routes.createFlower,
        id: "create-flower",
        className: ""
      },
      {
        title: "Account settings",
        path: routes.userProfile,
        id: "user-profile",
        className: "static"
      },
      {
        title: <LogOut />,
        path: "/",
        id: "log-out",
        className: "logout"
      }
    ];
    const { pathname } = this.props.history.location;
    return (
      <header className="header">
        {pathname === "/" ||
        pathname === routes.logIn ||
        pathname === routes.signUp ? null : (
          <div>
            <Sidebar links={links} />
          </div>
        )}
        {this.props.authReducer.user === null ? (
          <div />
        ) : (
          <Link className="header__name" to={routes.userProfile}>
            @{this.props.authReducer.user.name}
          </Link>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

Header = withRouter(Header);

export default connect(
  mapStateToProps,
  { push }
)(Header);

// export default withRouter(Header);
