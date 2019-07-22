import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as geolocatedActions from "redux/modules/geolocated";
import { Modal, MapComponent } from "components/Base/Modal";

class Maps extends Component {
  handleClose = () => {
    const { GeolocatedActions } = this.props;
    GeolocatedActions.setMapsVisibility(false);
  };

  render() {
    const {
      latitude,
      longitude,
      postLatitude,
      postLongitude,
      visible,
      likesCoords
    } = this.props;
    if (!visible) return null;
    return (
      <Modal handleClose={this.handleClose}>
        {latitude && longitude && postLatitude && postLongitude ? (
          <MapComponent
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=" +
              process.env.REACT_APP_GOOGLE_MAPS_KEY +
              ",drawing,places"
            }
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            latitude={latitude}
            longitude={longitude}
            postLatitude={postLatitude}
            postLongitude={postLongitude}
            likesCoords={likesCoords}
          />
        ) : null}
      </Modal>
    );
  }
}
export default connect(
  state => ({
    latitude: state.geolocated.getIn(["coords", "latitude"]),
    longitude: state.geolocated.getIn(["coords", "longitude"]),
    postLatitude: state.geolocated.getIn(["maps", "coords", "latitude"]),
    postLongitude: state.geolocated.getIn(["maps", "coords", "longitude"]),
    likesCoords: state.geolocated.getIn(["maps", "likesCoords"]),
    visible: state.geolocated.getIn(["maps", "visible"])
  }),
  dispatch => ({
    GeolocatedActions: bindActionCreators(geolocatedActions, dispatch)
  })
)(Maps);
