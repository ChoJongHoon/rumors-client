import React, { Component } from "react";
import Profile from "components/Base/Header/Profile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import storage from "lib/storage";
import * as userActions from "redux/modules/user";
import * as writeActions from "redux/modules/write";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleWrite = () => {
    const { WriteActions } = this.props;
    WriteActions.setWriteVisibility(true);
    this.handleClose();
  };

  handleLogout = async () => {
    const { UserActions } = this.props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/auth/login";
  };

  render() {
    const { visible, profile } = this.props;
    if (!visible || !profile) return null;
    return (
      <div>
        <Profile
          src={profile}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleWrite}>새 글 작성</MenuItem>
          <MenuItem onClick={this.handleLogout}>로그아웃</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default connect(
  state => ({
    visible: state.base.getIn(["header", "visible"]),
    profile: state.user.getIn(["loggedInfo", "userProfile"])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    WriteActions: bindActionCreators(writeActions, dispatch)
  })
)(ProfileContainer);
