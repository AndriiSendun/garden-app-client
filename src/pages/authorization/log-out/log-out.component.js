import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { logOut } from "../authorization.action";
import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";

import "./log-out.styles.scss";

class LogOut extends Component {
  onLogoutClick() {
    this.props.logOut();
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.push("/");
    }
  }

  render() {
    const { submitting } = this.props;

    return (
      <>
        <Button
          title="Log out"
          buttonType={TYPES.PRIMARY}
          type="submit"
          disabled={submitting}
          customClass={"logout"}
          onClick={this.onLogoutClick.bind(this)}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  message: state.authReducer.message
});

LogOut = reduxForm({
  form: "logOut"
})(LogOut);

export default connect(
  mapStateToProps,
  { logOut, push }
)(LogOut);
