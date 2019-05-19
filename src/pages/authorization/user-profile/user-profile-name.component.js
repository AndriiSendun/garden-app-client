import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { updateUser, clearMessage } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import { maxLength15, requireUserName } from "./user-profile.validation";

class UpdateName extends Component {
  onSubmit(inputValue) {
    this.props.clearMessage();
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <>
        <div className="authorization--form">
          <h2 className="authorization--form__title">Personal info</h2>
          <form
            onSubmit={handleSubmit(value =>
              this.onSubmit.bind(this)({ name: value.name })
            )}
          >
            <Field
              name="name"
              type="text"
              component={Input}
              label="Username"
              validate={[maxLength15, requireUserName]}
            />
            <Button
              title="UPDATE"
              type="submit"
              buttonType={TYPES.PRIMARY}
              disabled={submitting || invalid}
            />
            {this.props.message === "Cannot change name" ? (
              <div className="error-message">{this.props.message}</div>
            ) : null}
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UpdateName = reduxForm({
  form: "update-name"
})(UpdateName);

export default connect(
  mapStateToProps,
  { updateUser, clearMessage }
)(UpdateName);
