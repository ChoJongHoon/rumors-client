import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Auth } from "pages";
import HeaderContainer from "containers/Base/HeaderContainer";
import ProfileContainer from "containers/Base/ProfileContainer";
import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as geolocatedActions from "redux/modules/geolocated";
import { Write, Comments, Maps } from "containers/Modal";

class App extends Component {
  initializeUserInfo = async () => {
    const pathname = window.location.pathname;
    const loggedInfo = storage.get("loggedInfo"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) {
      if (pathname !== "/auth/login")
        window.location.href = "/auth/login?expired"; // 로그인 정보가 없다면 여기서 멈춥니다.
      return;
    }

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove("loggedInfo");
      window.location.href = "/auth/login?expired";
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
      <>
        <Write />
        <Comments />
        <Maps />
        <HeaderContainer />
        <ProfileContainer />
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    GeolocatedActions: bindActionCreators(geolocatedActions, dispatch)
  })
)(App);
