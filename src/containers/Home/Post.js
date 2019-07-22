import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postsActions from "redux/modules/posts";
import * as commentsActions from "redux/modules/comments";
import * as geolocatedActions from "redux/modules/geolocated";
import * as PostAPI from "lib/api/post";
import {
  PostWrapper,
  PostHeader,
  PostProfile,
  PostNameDate,
  PostText,
  PostImageWrapper,
  PostImage,
  PostCounter,
  PostFooter,
  PostTab
} from "components/Home";
import {
  faBroadcastTower,
  faComment,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

class Post extends Component {
  handleClickLike = async () => {
    const {
      PostsActions,
      idx,
      posts,
      postNo,
      userNo,
      latitude,
      longitude
    } = this.props;
    if (!posts[idx].myLike) {
      await PostAPI.insertLike({ postNo, userNo, latitude, longitude });
      PostsActions.changeMyLike({ idx, value: 1 });
      PostsActions.changeCountLike({ idx, value: 1 });
    } else {
      await PostAPI.deleteLike({ postNo, userNo });
      PostsActions.changeMyLike({ idx, value: 0 });
      PostsActions.changeCountLike({ idx, value: -1 });
    }
  };

  handleClickComment = async () => {
    const { CommentsActions, postNo } = this.props;
    await CommentsActions.select(postNo);
    await CommentsActions.setPostNo(postNo);
    CommentsActions.setCommentVisibility(true);
  };

  handleClickMaps = async () => {
    const {
      GeolocatedActions,
      postNo,
      postLatitude,
      postLongitude
    } = this.props;
    await GeolocatedActions.setMapsPostNo(postNo);
    await GeolocatedActions.setPostCoords({
      latitude: Number(postLatitude),
      longitude: Number(postLongitude)
    });
    await GeolocatedActions.setMapsLikesCoords(postNo);
    await GeolocatedActions.setMapsVisibility(true);
  };

  render() {
    const {
      userName,
      userProfile,
      postDate,
      images,
      postCountLike,
      postCountComment,
      myLike,
      children
    } = this.props;

    return (
      <PostWrapper>
        <PostHeader>
          <PostProfile src={userProfile} />
          <PostNameDate date={postDate}>{userName}</PostNameDate>
        </PostHeader>
        <PostText>
          {children.split("\n").map((item, idx) => (
            <span key={idx}>
              {item}
              <br />
            </span>
          ))}
        </PostText>
        <PostImageWrapper>
          {images
            ? images
                .split(",")
                .map((image, idx) => <PostImage key={idx} src={image} />)
            : null}
        </PostImageWrapper>
        <PostCounter like={postCountLike} comment={postCountComment} />
        <PostFooter>
          <PostTab
            icon={faBroadcastTower}
            active={myLike}
            onClick={this.handleClickLike}
          >
            소문 내기
          </PostTab>
          <PostTab icon={faComment} onClick={this.handleClickComment}>
            댓글 달기
          </PostTab>
          <PostTab icon={faMapMarkedAlt} onClick={this.handleClickMaps}>
            위치 보기
          </PostTab>
        </PostFooter>
      </PostWrapper>
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
    PostsActions: bindActionCreators(postsActions, dispatch),
    GeolocatedActions: bindActionCreators(geolocatedActions, dispatch),
    CommentsActions: bindActionCreators(commentsActions, dispatch)
  })
)(Post);
