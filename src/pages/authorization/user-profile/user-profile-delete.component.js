import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { deleteUser } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";

class DeleteProfile extends Component {
  render() {
    return (
      <div className="authorization--form">
        <h2 className="authorization--form__title">Delete account</h2>
        <p className="authorization--form__description">
          This account will be permanently deleted. After this, you will not be
          able to restore it again.
        </p>
        <Button
          title="DELETE"
          onClick={() => {
            window.confirm(
              "Are you sure you want to permanently delete your account?"
            ) && this.props.deleteUser();
          }}
          buttonType={TYPES.DELETE}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

DeleteProfile = reduxForm({
  form: "delete"
})(DeleteProfile);

export default connect(
  mapStateToProps,
  { deleteUser, push }
)(DeleteProfile);
