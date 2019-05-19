import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import {
  register,
  clearMessage,
  falseRegistered
} from "../authorization.action";

import {
  requirePassword,
  requireUserName,
  email,
  requireEmail,
  maxLength15,
  minLength6,
  passwordsMatch,
  repeatPassword
} from "./sign-up.validation";

import asyncValidate from "./sign-up.async-validation";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";
import Header from "../../../common/header/header.component";
import CustomLink from "../../../common/components/custom-link/custom-link.component";
import PageTitle from "./../../../common/page-title/page-title.component";
import Spinner from "./../../../common/components/spinner/spinner.component";

import routes from "../../../constants/routes";

import "./sign-up.styles.scss";

class SignUp extends Component {
  onSubmit({ name, email, password }) {
    return this.props.register({ name, email, password });
  }

  componentDidUpdate() {
    if (this.props.isRegistered) {
      this.props.push(routes.signUpSuccess);
    }
  }

  render() {
    const { error, handleSubmit, submitting, valid } = this.props;

    return (
      <>
        {this.props.isLoading ? <Spinner /> : null}
        <Header />
        <PageTitle title="Register to Cyander" />
        <div className="authorization authorization--sign-up">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name="name"
              type="text"
              component={Input}
              label="User name"
              placeholder="User name"
              validate={[requireUserName, maxLength15]}
            />
            <Field
              name="email"
              type="email"
              component={Input}
              label="Email"
              placeholder="Email"
              validate={[email, requireEmail]}
            />
            <Field
              name="password"
              type="password"
              component={Input}
              label="Password"
              placeholder="Password"
              validate={[requirePassword, minLength6]}
            />
            <Field
              name="repeat-password"
              type="password"
              component={Input}
              label="Repeat password"
              placeholder="Repeat password"
              validate={[repeatPassword, passwordsMatch]}
            />
            {error && <div className="error-message">{error}</div>}
            <Button
              title="SIGN UP"
              type="submit"
              buttonType={TYPES.PRIMARY}
              disabled={!valid || submitting}
            />
          </form>
          <div className="authorization__helper">
            <span>Have an account?</span>
            <CustomLink
              additionalClass="link--sign-up"
              title="Login"
              onClick={() => {
                this.props.push(routes.logIn);
                this.props.clearMessage();
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.authReducer.isRegistered,
  isLoading: state.authReducer.isLoading
});

SignUp = reduxForm({
  form: "signUp",
  asyncValidate,
  asyncBlurFields: ["email"]
})(SignUp);

export default connect(
  mapStateToProps,
  { register, push, falseRegistered, clearMessage }
)(SignUp);
