import React from "react";
import { Link } from "react-router-dom";

import ReactTooltip from "react-tooltip";

import axios from "axios";

import "./dashboard.styles.scss";
import { Button, TYPES } from "../../common/components/button/button.component";

import Header from "../../common/header/header.component";
import Footer from "../../common/footer/footer.component";
import PageTitle from "../../common/page-title/page-title.component";

import Sensors from "./sensors.component";

import { backendUrl } from "../../constants/backendUrl";

import ArrowUp from "../../assets/arrow-up.svg";
import ArrowDown from "../../assets/arrow-down.svg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      flowers: [],
      sortBy: "name",
      isAscendingSort: true,
      isProblematicSort: true,
      filterDisconnected: true,
      isConnected: false
    };
    this.flower = [];
    this.issues = [];
    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
    this.renderFallbackMessage = this.renderFallbackMessage.bind(this);
  }

  componentDidMount() {
    const curretnUser = JSON.parse(`${localStorage.getItem("state")}`)
      .authReducer.user.id;

    axios
      .get(`${backendUrl}/user-flowers?id=${curretnUser}`)
      .then(flower => {
        flower.data.forEach(current => {
          this.flower.push(current);
          this.setState(state => {
            const flowers = state.flowers.push(current);

            return flowers;
          });
        });
      })
      .catch(err => err);
  }

  onFilter(e) {
    this.setState({ filter: e.target.value });
  }

  onSelect(e) {
    this.setState({ sortBy: e.target.value });
  }

  onSort() {
    this.setState(({ flowers, sortBy, isAscendingSort }) => {
      flowers.sort((a, b) => {
        const left = a[sortBy].toLowerCase();
        const right = b[sortBy].toLowerCase();
        const statement = isAscendingSort ? left < right : left > right;

        return statement ? -1 : 1;
      });

      return { flowers, isAscendingSort: !isAscendingSort };
    });
  }

  sortConnected = () => {
    this.setState(({ flowers, isConnected }) => {
      const active = flowers.filter(flower => flower.package_id !== "");

      return {
        flowers: !isConnected && active.length ? [...active] : this.flower,
        isConnected: !isConnected
      };
    });
  };

  sortDisconnected = () => {
    this.setState(({ flowers, filterDisconnected }) => {
      const disconnected = flowers.filter(flower => flower.package_id === "");

      return {
        flowers:
          filterDisconnected && disconnected.length
            ? [...disconnected]
            : this.flower,
        filterDisconnected: !filterDisconnected
      };
    });
  };

  sortByProblems = () => {
    const flower = this.issues
      .map(flow => flow.id)
      .reduce((obj, current) => {
        obj[current] ? obj[current]++ : (obj[current] = 2);
        return obj;
      }, {});

    const order = Object.keys(flower).sort((a, b) => flower[b] - flower[a]);
    this.setState(({ flowers, isProblematicSort }) => {
      const itemsToFilter = flowers.filter(flower => flower.package_id !== "");
      const rest = flowers.filter(flower => flower.package_id === "");
      if (isProblematicSort) {
        itemsToFilter.sort(
          (a, b) => order.indexOf(a._id) - order.indexOf(b._id)
        );
      } else {
        itemsToFilter.sort(
          (a, b) => order.indexOf(b._id) - order.indexOf(a._id)
        );
      }
      const filtered = [...itemsToFilter, ...rest];
      return { flowers: filtered, isProblematicSort: !isProblematicSort };
    });
  };

  renderThumbnails(data) {
    return data.map(flower => {
      return <Sensors flower={flower} key={flower._id} issues={this.issues} />;
    });
  }

  renderFallbackMessage() {
    return !this.state.flowers.length ? (
      <p>There are no flowers yet</p>
    ) : (
      <p>No mathes</p>
    );
  }

  render() {
    let renderContent;
    const { filter, flowers, isAscendingSort } = this.state;
    const data = flowers.filter(item =>
      item.name.toLowerCase().match(filter.toLowerCase())
    );

    if (this.state.flowers.length) {
      renderContent = (
        <>
          <section className="dashboard">
            <div className="dashboard__search">
              <label className="dashboard__search__title">Search</label>
              <input
                data-tip="Search for flowers..."
                className="dashboard__search--field"
                type="text"
                placeholder="Flower name..."
                value={filter}
                onChange={this.onFilter}
              />
            </div>

            <div className="dashboard--sorting">
              <span className="dashboard--sorting__title">Sort by</span>

              <div className="dashboard--sorting--alphabetical">
                <label onClick={this.onSort} data-tip="Sort flowers by name">
                  Alphabetical
                  <button className="dashboard--sorting__button">
                    <img
                      className={
                        isAscendingSort ? "icon icon--up" : "icon icon--down"
                      }
                      src={isAscendingSort ? ArrowUp : ArrowDown}
                      alt="sort by alphabet"
                    />
                  </button>
                </label>
              </div>
            </div>
            <div className="dashboard--sorting">
              <span className="dashboard--sorting__title">Filter by</span>
              <div className="dashboard--sorting--problematical">
                <div className="dashboard--sorting--problematical--problematical">
                  <input
                    id="problematical"
                    type="checkbox"
                    onClick={this.sortConnected}
                    className="checkbox"
                  />
                  <label htmlFor="problematical" className="checkbox__label">
                    Problematical
                  </label>
                </div>
                <div className="dashboard--sorting--problematical--disconnected">
                  <input
                    id="disconnected"
                    type="checkbox"
                    onClick={this.sortConnected}
                    className="checkbox"
                  />
                  <label htmlFor="disconnected" className="checkbox__label">
                    Disconnected
                  </label>
                </div>
              </div>
            </div>
          </section>
          <div className="dashboard--flower-list">
            <h2 className="dashboard--flower-list__title">Flower list</h2>
            <Link to="/create" className="dashboard__link">
              CREATE FLOWER
            </Link>
            <div className="dashboard--thumbnail">
              {data.length
                ? this.renderThumbnails(data)
                : this.renderFallbackMessage()}
            </div>
          </div>
        </>
      );
    } else {
      renderContent = (
        <div className="empty-dashboard">
          <p className="empty-dashboard__title">You have no flowers</p>
          <div className="empty-dashboard--create">
            <Link to="/create" className="create__link">
              <Button buttonType={TYPES.PRIMARY} title="CREATE FLOWER" />
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard--page">
        <PageTitle title="Dashboard" />
        <Header />
        {renderContent}
        <Footer />
        <ReactTooltip />
      </div>
    );
  }
}

export default Dashboard;
