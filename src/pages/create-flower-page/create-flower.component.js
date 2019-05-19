import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { resetState } from "../../common/custom-select/create-flower.action";

import FlowerForm from "./create-flower-form/create-flower-form.component";
import flowers from "../../constants/flowers";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";
import { confirm } from "../../common/confirm-popup/confirm-popup.component";
import Footer from "../../common/footer/footer.component";

import routes from "../../constants/routes";
import { backendUrl } from "../../constants/backendUrl";
import "./create-flower.scss";

import { Button, TYPES } from "../../common/components/button/button.component";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateFlower extends Component {
  componentWillUnmount() {
    this.props.resetState();
  }

  componentDidMount() {
    toast.configure({
      autoClose: 4000,
      progressStyle: {
        backgroundImage: "linear-gradient(to right, #46a25f, #15d94a)"
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.resetState();
      return true;
    } else {
      return false;
    }
  }

  isEditPage = () => this.props.location.pathname === routes.edit;

  notify = message => toast(message);

  deleteFlower = () => {
    axios
      .delete(
        `${backendUrl}/flower-delete?id=${
          this.props.location.state.currentFlower._id
        }`
      )
      .then(res => {
        this.props.history.push(routes.dashboard);
        this.notify(`${res.data.name} has been successfully removed!`);
      })
      .catch(err => err);
  };

  confirmDelete = () => {
    confirm({
      title: "Are you sure you want to delete",
      item: this.props.location.state.currentFlower.name,
      confirmRemove: () => this.deleteFlower()
    });
  };

  recordUserFlower = userRecord => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`
      }
    };
    axios
      .put(`${backendUrl}/api/users`, JSON.stringify(userRecord), config)
      .then(res => this.props.history.push(routes.dashboard));
  };

  submitFlower = flower => {
    return axios.post(`${backendUrl}/flower`, flower);
  };

  updateFlower = updateData => {
    axios
      .put(
        `${backendUrl}/flower-update?id=${
          this.props.location.state.currentFlower._id
        }`,
        updateData
      )
      .then(res => {
        this.props.history.goBack();
        this.notify(`${res.data.name} has been successfully updated!`);
      })
      .catch(err => err);
  };

  submitHandler = flowerData => {
    const flowerImage = flowers
      .filter(img => img.name === flowerData.type)
      .map(img => img.flower_img);
    const [img_path] = flowerImage;

    const user = JSON.parse(localStorage.getItem("state"));
    const userId = user.authReducer.user.id;

    const flowerParams = {
      ...flowerData,
      img_path: img_path,
      user_id: userId,
      created_at: new Date().getTime()
    };

    if (!this.isEditPage()) {
      this.submitFlower(flowerParams).then(res => {
        this.notify(`${res.data.name} has been successfully created!`);
        this.recordUserFlower({
          flowerRecord: res.data._id,
          userRecord: userId
        });
      });
    } else {
      this.updateFlower(flowerData);
    }
  };

  render() {
    return (
      <>
        <Header />
        <PageTitle
          title={this.isEditPage() ? "Edit Flower" : "Create Flower"}
        />

        <FlowerForm
          currentFlower={
            this.isEditPage() ? this.props.location.state.currentFlower : null
          }
          onSubmit={this.submitHandler}
          deleteFlower={this.confirmDelete}
        />

        <Button
          onClick={() =>
            this.isEditPage()
              ? this.props.history.goBack()
              : this.props.history.push(routes.dashboard)
          }
          customClass="button__cancel"
          type="text"
          title={"Cancel"}
          buttonType={TYPES.DELETE}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { push, resetState }
)(CreateFlower);
