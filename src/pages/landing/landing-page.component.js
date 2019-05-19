import React, { useState } from "react";

import TWEEN from "@tweenjs/tween.js";
import { Link } from "react-router-dom";

import "./landing-page.styles.scss";

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      light: 0,
      humadity: 0,
      temp: 0
    };

    const startLight = { light: 0 };
    const endLight = { light: 100 };

    const lightTween = new TWEEN.Tween(startLight)
      .to(endLight, 10000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(light => {
        this.setState({ light: light.light ^ 0 });
      })
      .yoyo(true)
      .repeat(Infinity)
      .start();

    const startHumadity = { humadity: 0 };
    const endHumadity = { humadity: 100 };

    const humadityTween = new TWEEN.Tween(startHumadity)
      .to(endHumadity, 20000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(humadity => {
        this.setState({ humadity: humadity.humadity ^ 0 });
      })
      .yoyo(true)
      .repeat(Infinity)
      .start();

    const startTemp = { temp: 0 };
    const endTemp = { temp: 100 };

    const tempTween = new TWEEN.Tween(startTemp)
      .to(endTemp, 5000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(temp => {
        this.setState({ temp: temp.temp ^ 0 });
      })
      .yoyo(true)
      .repeat(Infinity)
      .start();
  }

  render() {
    const { light, humadity, temp } = this.state;
    return (
      <>
        <header className="landing-header">
          <div className="landing-header__head-logo">
            <h1 className="landing-header__head-logo--title">f[love].it</h1>
            <p className="landing-header__head-logo--tagline">
              Your first online garden app
            </p>
          </div>
          <blockquote className="landing-header__quote">
            "In the spring, at the end of the day, you should smell like dirt."
            —
            <cite className="landing-header__quote--cite">Margaret Atwood</cite>
          </blockquote>
        </header>
        <main className="main">
          <article className="area tracking">
            <h2 className="headline tracking__headline">Keep tracking</h2>
            <div className="content">
              <div className="content__description">
                Watch flower parameters update in real time
              </div>
              <div className="content__body">
                <div className="demo-scales">
                  <span className="demo-scales__tooltip">Soil moisture</span>
                  <div className="demo-scales__scales-block">
                    <div
                      className="demo-scales__scales-block--soil"
                      style={{ width: light }}
                    >
                      <span className="numbers soil"> {light}%</span>
                    </div>
                  </div>
                  <span className="demo-scales__tooltip">Air humidity</span>
                  <div className="demo-scales__scales-block">
                    <div
                      className="demo-scales__scales-block--airhumidity"
                      style={{ width: humadity }}
                    >
                      <span className="numbers humidity">{humadity}%</span>
                    </div>
                  </div>
                  <span className="demo-scales__tooltip">Air temperature</span>
                  <div className="demo-scales__scales-block">
                    <div
                      className="demo-scales__scales-block--temperature"
                      style={{ width: temp }}
                    >
                      <span className="numbers temp"> {temp}%</span>
                    </div>
                  </div>
                  <span className="demo-scales__tooltip">Ambient light</span>
                  <div className="demo-scales__scales-block">
                    <div
                      className="demo-scales__scales-block--light"
                      style={{ width: light }}
                    >
                      <span className="numbers light">{light}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="area alerts">
            <h2 className="headline alert__headline">Alert System</h2>
            <div className="content">
              <div className="content__description">
                Receive alerts when your plant is thirsty or in bad condition
              </div>
              <div className="content__body">
                <div className="alerts">
                  <i className="material-icons alerts__alert">warning</i>
                  <img
                    className="alerts__thumb"
                    src={require("../../assets/plant-image.png")}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </article>
          <article className="area realtime">
            <h2 className="headline realtime__headline">Realtime updates</h2>
            <div className="content">
              <div className="content__description">
                Receive real time data and suggestions on flower conditions
              </div>
              <div className="content__body">
                <div className="realtime__numbers">
                  <div className="realtime__numbers--light">
                    Light <span className="number-top light">{light}%</span>
                  </div>
                  <div className="realtime__numbers--moisture">
                    Humidity
                    <span className="number-top humidity">{humadity}%</span>
                  </div>
                  <div className="realtime__numbers--temperature">
                    Temp<span className="number-top temp">{temp}%</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="area statistics">
            <h2 className="headline statistics__headline">Statics</h2>
            <div className="content">
              <div className="content__description">
                Explore the details and history of flower life
              </div>
              <div className="content__body">
                <img
                  className="statistics__chart"
                  src={require("../../assets/charts.png")}
                  alt=""
                />
              </div>
            </div>
          </article>
        </main>
        <footer className="landing-footer">
          <Link className="landing-footer__trybtn" to="/home">
            Try now
          </Link>
          <div className="landing-footer__copyright">
            &copy; CYAN TEAM {new Date().getFullYear()}
          </div>
        </footer>
      </>
    );
  }
}

export default Landing;
