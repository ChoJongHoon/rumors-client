import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";
import { pender } from "redux-pender";
import * as PostAPI from "lib/api/post";

const SET_COMMENT_VISIBILITY = "comment/SET_COMMENT_VISIBILITY";
const SELECT = "comment/SELECT";
const INITIALIZE = "comment/INITIALIZE";
const CHANGE_INPUT = "comment/CHANGE_INPUT";
const SET_POST_NO = "comment/SET_POST_NO";

export const setCommentVisibility = createAction(SET_COMMENT_VISIBILITY); // visible
export const select = createAction(SELECT, PostAPI.selectComments);
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const setPostNo = createAction(SET_POST_NO);

const initialState = Map({
  visible: false,
  text: "",
  postNo: null,
  comments: null
});

export default handleActions(
  {
    [SET_COMMENT_VISIBILITY]: (state, action) => {
      return state.set("visible", action.payload);
    },
    [INITIALIZE]: state =>
      state
        .set("visible", false)
        .set("text", "")
        .set("postNo", null)
        .set("comments", null),
    ...pender({
      type: SELECT,
      onSuccess: (state, action) => state.set("comments", action.payload.data)
    }),
    [CHANGE_INPUT]: (state, action) => {
      return state.set("text", action.payload);
    },
    [SET_POST_NO]: (state, action) => state.set("postNo", action.payload)
  },
  initialState
);
