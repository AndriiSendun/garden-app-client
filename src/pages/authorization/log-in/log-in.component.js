import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { logIn, clearMessage } from "../authorization.action";
import { requirePassword, email, requireEmail } from "./log-in.validation";

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

import "./log-in.styles.scss";

class LogIn extends Component {
  onSubmit({ email, password }) {
    return this.props.logIn({ email, password });
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.push(routes.dashboard);
    }
  }

  render() {
    const { error, handleSubmit, submitting, valid } = this.props;

    return (
      <>
        {this.props.isLoading ? <Spinner /> : null}
        <Header />
        <PageTitle title="Login to Cyander" />
        <div className="authorization authorization--log-in">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name="email"
              type="email"
              component={Input}
              label="Email address"
              placeholder="Email"
              validate={[requireEmail, email]}
            />
            <Field
              name="password"
              type="password"
              component={Input}
              label="Password"
              placeholder="Password"
              validate={requirePassword}
            />
            {error && <div className="error-message">{error}</div>}
            <Button
              title="SIGN IN"
              type="submit"
              buttonType={TYPES.PRIMARY}
              disabled={!valid || submitting}
            />
          </form>
          <div className="authorization__helper">
            <span>New to Cyander?</span>
            <CustomLink
              additionalClass="link--log-in"
              title="Sign up"
              onClick={() => {
                this.props.push(routes.signUp);
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
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading
});

LogIn = reduxForm({
  form: "logIn"
})(LogIn);

export default connect(
  mapStateToProps,
  { logIn, clearMessage, push }
)(LogIn);
