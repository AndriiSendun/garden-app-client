import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Header from "../../../common/header/header.component";
import CustomLink from "../../../common/components/custom-link/custom-link.component";

import { falseRegistered, clearMessage } from "../authorization.action";
import routes from "../../../constants/routes";

import "./sign-up-success.styles.scss";

class SignUpSuccess extends Component {
  componentWillMount() {
    if (this.props.isRegistered) {
      this.props.falseRegistered();
    } else {
      this.props.push(routes.landing);
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="sign-up-success">
          <h2 className="sign-up-success__title">Success!</h2>
          <div className="sign-up-success__description">
            <div>
              Your account has been successfully created. Now you are able to
              login in the app.
            </div>
            <CustomLink
              title="Go to login"
              onClick={() => {
                this.props.clearMessage();
                this.props.push(routes.logIn);
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.authReducer.isRegistered
});

export default connect(
  mapStateToProps,
  { push, falseRegistered, clearMessage }
)(SignUpSuccess);
