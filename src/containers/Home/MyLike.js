import React, { Component } from "react";
import { Subtitle } from "components/Home";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postsActions from "redux/modules/posts";
import Post from "./Post";

class MyLike extends Component {
  componentDidMount() {
    const { PostsActions, userNo } = this.props;

    PostsActions.selectMyLike({
      userNo
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <Subtitle>내가 소문낸 게시글</Subtitle>
        {posts
          ? posts.map((post, idx) => (
              <Post
                key={post.postNo}
                idx={idx}
                postNo={post.postNo}
                userName={post.userName}
                userProfile={post.userProfile}
                postDate={post.postDate}
                postLatitude={post.postLatitude}
                postLongitude={post.postLongitude}
                myLike={post.myLike}
                postCountLike={post.postCountLike}
                postCountComment={post.postCountComment}
                images={post.images}
              >
                {post.postText}
              </Post>
            ))
          : null}
      </>
    );
  }
}

export default connect(
  state => ({
    posts: state.posts.get("posts"),
    userNo: state.user.getIn(["loggedInfo", "userNo"])
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(MyLike);
