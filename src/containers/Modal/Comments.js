import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentsActions from "redux/modules/comments";
import {
  Modal,
  CommentsWrapper,
  Comment,
  CommentInput
} from "components/Base/Modal";
import * as PostAPI from "lib/api/post";

class Comments extends Component {
  handleClose = () => {
    const { CommentsActions } = this.props;
    CommentsActions.initialize();
  };

  handleChange = e => {
    const { CommentsActions } = this.props;
    CommentsActions.changeInput(e.target.value);
  };

  handleSubmit = async () => {
    const { CommentsActions, postNo, userNo, text } = this.props;
    await PostAPI.insertComment({
      postNo,
      userNo,
      text
    });
    await CommentsActions.select(postNo);
  };

  render() {
    const { visible, text, comments, userProfile } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <Modal handleClose={this.handleClose}>
        <CommentsWrapper>
          {comments
            ? comments.map((comment, idx) => (
                <Comment
                  key={idx}
                  userProfile={comment.userProfile}
                  userName={comment.userName}
                  date={comment.commentDate}
                >
                  {comment.commentText}
                </Comment>
              ))
            : null}
        </CommentsWrapper>
        <CommentInput
          userProfile={userProfile}
          onChange={this.handleChange}
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.handleSubmit();
              const { CommentsActions } = this.props;
              CommentsActions.changeInput("");
            }
          }}
          value={text}
        />
      </Modal>
    );
  }
}

export default connect(
  state => ({
    visible: state.comments.get("visible"),
    userNo: state.user.getIn(["loggedInfo", "userNo"]),
    userProfile: state.user.getIn(["loggedInfo", "userProfile"]),
    text: state.comments.get("text"),
    comments: state.comments.get("comments"),
    postNo: state.comments.get("postNo")
  }),
  dispatch => ({
    CommentsActions: bindActionCreators(commentsActions, dispatch)
  })
)(Comments);
