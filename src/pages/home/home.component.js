import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import { Button, TYPES } from "../../common/components/button/button.component";

import homeImg from "../../assets/home-page.png";
import "./home.styles.scss";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2 className="home__title">
          <span className="title-span">Your home.</span>
          <span className="title-span title-span--green">Planty</span>
        </h2>
        <h3 className="home__subtitle">Enjoy the experiance</h3>
        <div className="home__img">
          <img className="img" src={homeImg} alt="home" />
        </div>

        <div className="buttons">
          <Button
            title="Log In"
            buttonType={TYPES.PRIMARY}
            onClick={() => {
              this.props.push("log-in");
            }}
          />
          <Button
            title="Sign Up"
            buttonType={TYPES.SECONDARY}
            onClick={() => {
              this.props.push("sign-up");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { push }
)(Home);
