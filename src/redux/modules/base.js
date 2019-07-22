import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_HEADER_VISIBILITY = "base/SET_HEADER_VISIBILITY"; // 헤더 렌더링 여부 설정
const SET_PATHNAME = "base/SET_PATHNAME"; // 헤더 렌더링 여부 설정

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const setPathname = createAction(SET_PATHNAME);

const initialState = Map({
  header: Map({
    visible: true,
    pathname: ""
  })
});

export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) => {
      return state.setIn(["header", "visible"], action.payload);
    },
    [SET_PATHNAME]: (state, action) => {
      return state.setIn(["header", "pathname"], action.payload);
    }
  },
  initialState
);
