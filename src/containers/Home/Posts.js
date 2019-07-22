import React, { Component } from "react";
import { Subtitle } from "components/Home";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postsActions from "redux/modules/posts";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    const { PostsActions, latitude, longitude, userNo } = this.props;

    PostsActions.select({
      latitude,
      longitude,
      userNo
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <Subtitle>새로운 소식</Subtitle>
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
    userNo: state.user.getIn(["loggedInfo", "userNo"]),
    latitude: state.geolocated.getIn(["coords", "latitude"]),
    longitude: state.geolocated.getIn(["coords", "longitude"])
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(Posts);
