import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { updateUser, clearMessage } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import {
  minLength6,
  requirePassword,
  repeatPassword,
  passwordsMatch
} from "./user-profile.validation";

class UpdatePassword extends Component {
  onSubmit(inputValue) {
    this.props.clearMessage();
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid, reset } = this.props;

    return (
      <div className="authorization--form">
        <h2 className="authorization--form__title">Password reset</h2>
        <form
          onSubmit={handleSubmit(value => {
            this.onSubmit.bind(this)({ password: value.password });
            reset();
          })}
        >
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
            placeholder="Password"
            validate={[requirePassword, minLength6]}
          />
          <Field
            name="Repeat password"
            type="password"
            component={Input}
            label="Repeat password"
            placeholder="Repeat password"
            validate={[repeatPassword, passwordsMatch]}
          />
          <Button
            title="UPDATE"
            type="submit"
            buttonType={TYPES.PRIMARY}
            disabled={submitting || pristine || invalid}
          />
          {this.props.message === "Cannot change password" ? (
            <div className="error-message">{this.props.message}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UpdatePassword = reduxForm({
  form: "update-password"
})(UpdatePassword);

export default connect(
  mapStateToProps,
  { updateUser, push, clearMessage }
)(UpdatePassword);
