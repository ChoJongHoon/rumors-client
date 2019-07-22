import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as writeActions from "redux/modules/write";
import { Modal, ModalTextArea } from "components/Base/Modal";
import * as PostAPI from "lib/api/post";
class Write extends Component {
  handleClose = () => {
    const { WriteActions } = this.props;
    WriteActions.setWriteVisibility(false);
  };

  handleChange = e => {
    const { WriteActions } = this.props;
    WriteActions.changeInput(e.target.value);
  };

  handleSubmit = async () => {
    const { text, userNo, latitude, longitude } = this.props;
    await PostAPI.insertPost({
      userNo,
      postText: text,
      postLatitude: latitude,
      postLongitude: longitude
    });
    window.location.reload();
  };

  render() {
    const { visible, text } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <Modal
        btnText="글 작성"
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmit}
      >
        <ModalTextArea
          onChange={this.handleChange}
          name="text"
          placeholder="글을 작성해주세요..."
          style={{
            height: "20rem"
          }}
        >
          {text}
        </ModalTextArea>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    visible: state.write.get("visible"),
    userNo: state.user.getIn(["loggedInfo", "userNo"]),
    text: state.write.get("text"),
    latitude: state.geolocated.getIn(["coords", "latitude"]),
    longitude: state.geolocated.getIn(["coords", "longitude"])
  }),
  dispatch => ({
    WriteActions: bindActionCreators(writeActions, dispatch)
  })
)(Write);
