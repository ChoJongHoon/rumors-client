import React, { Component } from "react";
import { Subtitle } from "components/Home";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postsActions from "redux/modules/posts";
import Post from "./Post";

class MyPosts extends Component {
  componentDidMount() {
    const { PostsActions, userNo } = this.props;

    PostsActions.selectMy({
      userNo
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <Subtitle>내가 작성한 게시글</Subtitle>
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
)(MyPosts);
