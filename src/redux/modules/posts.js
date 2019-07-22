import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as PostAPI from "lib/api/post";
import { Map } from "immutable";

const SELECT = "posts/SELECT";
const SELECT_MY = "posts/SELECT_MY";
const SELECT_MY_LIKE = "posts/SELECT_MY_LIKE";
const CHANGE_MY_LIKE = "post/CHANGE_MY_LIKE";
const CHANGE_COUNT_LIKE = "post/CHANGE_COUNT_LIKE";

export const select = createAction(SELECT, PostAPI.selectPosts);
export const selectMy = createAction(SELECT_MY, PostAPI.selectMyPosts);
export const selectMyLike = createAction(
  SELECT_MY_LIKE,
  PostAPI.selectMyLikePosts
);
export const changeMyLike = createAction(CHANGE_MY_LIKE);
export const changeCountLike = createAction(CHANGE_COUNT_LIKE);

const initialState = Map({
  posts: null
});

export default handleActions(
  {
    ...pender({
      type: SELECT,
      onSuccess: (state, action) => state.set("posts", action.payload.data)
    }),
    ...pender({
      type: SELECT_MY,
      onSuccess: (state, action) => state.set("posts", action.payload.data)
    }),
    ...pender({
      type: SELECT_MY_LIKE,
      onSuccess: (state, action) => state.set("posts", action.payload.data)
    }),
    [CHANGE_MY_LIKE]: (state, action) => {
      const { idx, value } = action.payload;
      return state.setIn(["posts", idx, "myLike"], value);
    },
    [CHANGE_COUNT_LIKE]: (state, action) => {
      const { idx, value } = action.payload;
      return state.setIn(
        ["posts", idx, "postCountLike"],
        state.getIn(["posts", idx, "postCountLike"]) + value
      );
    }
  },
  initialState
);
