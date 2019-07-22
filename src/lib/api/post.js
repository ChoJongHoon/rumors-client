import axios from "axios";

export const selectPosts = ({ latitude, longitude, userNo }) =>
  axios.get(
    "/api/post/select/posts?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&userNo=" +
      userNo
  );

export const selectMyPosts = ({ userNo }) =>
  axios.get("/api/post/select/myposts?userNo=" + userNo);

export const selectMyLikePosts = ({ userNo }) =>
  axios.get("/api/post/select/mylikeposts?userNo=" + userNo);

export const insertPost = ({ userNo, postText, postLatitude, postLongitude }) =>
  axios.post("/api/post/insert/post", {
    userNo,
    postText,
    postLatitude,
    postLongitude
  });

export const insertLike = ({ postNo, userNo, latitude, longitude }) =>
  axios.post("/api/post/insert/like", { postNo, userNo, latitude, longitude });

export const deleteLike = ({ postNo, userNo }) => {
  axios.post("api/post/delete/like", { postNo, userNo });
};

export const selectComments = postNo =>
  axios.get("/api/post/select/comments?postNo=" + postNo);

export const insertComment = ({ postNo, userNo, text }) =>
  axios.post("/api/post/insert/comment", { postNo, userNo, text });

export const selectLikes = postNo =>
  axios.post("/api/post/select/likes", { postNo });
