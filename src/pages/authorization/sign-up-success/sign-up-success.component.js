import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import PageTitle from './../../../common/page-title/page-title.component';
import CustomLink from '../../../common/components/custom-link/custom-link.component';

import { falseRegistered, clearMessage } from '../authorization.action';
import routes from '../../../constants/routes';

import './sign-up-success.styles.scss';

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
        <header className="header"></header>
        <PageTitle title="Success!"/>
        <div className='sign-up-success'>
          <div className='sign-up-success__description'>
            <div>
              Your account has been successfully created. Now you can log in to
              the app.
            </div>
            <CustomLink
              title='Go to login'
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
