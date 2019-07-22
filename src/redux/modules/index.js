import { combineReducers } from "redux";
import base from "./base";
import auth from "./auth";
import user from "./user";
import posts from "./posts";
import comments from "./comments";
import write from "./write";
import geolocated from "./geolocated";
import { penderReducer } from "redux-pender";

export default combineReducers({
  base,
  auth,
  user,
  geolocated,
  posts,
  comments,
  write,
  pender: penderReducer
});
