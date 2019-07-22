import React, { Component } from "react";
import { Header, Weather } from "components/Base/Header";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";

class HeaderContainer extends Component {
  render() {
    const { visible, temp, city, country, icon, pathname } = this.props;
    if (!visible) return null;
    return (
      <Header pathname={pathname}>
        <Weather temp={temp} city={city} country={country} icon={icon} />{" "}
      </Header>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["header", "visible"]),
    temp: state.geolocated.getIn(["weather", "temp"]),
    city: state.geolocated.getIn(["weather", "city"]),
    country: state.geolocated.getIn(["weather", "country"]),
    icon: state.geolocated.getIn(["weather", "icon"]),
    pathname: state.base.getIn(["header", "pathname"])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
