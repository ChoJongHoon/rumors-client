import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as geolocatedActions from "redux/modules/geolocated";
import * as baseActions from "redux/modules/base";
import { Route } from "react-router-dom";
import { Posts, MyPosts, MyLike } from "containers/Home";
import { geolocated } from "react-geolocated";
import { ErrorWrapper } from "components/Base/Error";

class Home extends Component {
  render() {
    const {
      GeolocatedActions,
      BaseActions,
      userNo,
      latitude,
      longitude,
      location
    } = this.props;
    BaseActions.setPathname(location.pathname);
    if (this.props.coords) {
      GeolocatedActions.setCoords({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      });
      GeolocatedActions.setWeather();
    }
    if (this.props.isGeolocationAvailable) {
      if (this.props.isGeolocationEnabled) {
      } else {
        return <ErrorWrapper>위치 정보 수집을 허용해주세요.</ErrorWrapper>;
      }
    } else {
      return <ErrorWrapper>지원하지 않는 브라우저입니다.</ErrorWrapper>;
    }
    return (
      <>
        <Route
          exact
          path="/"
          component={userNo && latitude && longitude ? Posts : null}
        />
        <Route
          path="/mypost"
          component={userNo && latitude && longitude ? MyPosts : null}
        />
        <Route
          path="/mylike"
          component={userNo && latitude && longitude ? MyLike : null}
        />
      </>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(
  connect(
    state => ({
      posts: state.posts.get("posts"),
      userNo: state.user.getIn(["loggedInfo", "userNo"]),
      latitude: state.geolocated.getIn(["coords", "latitude"]),
      longitude: state.geolocated.getIn(["coords", "longitude"])
    }),
    dispatch => ({
      GeolocatedActions: bindActionCreators(geolocatedActions, dispatch),
      BaseActions: bindActionCreators(baseActions, dispatch)
    })
  )(Home)
);
