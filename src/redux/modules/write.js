import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_WRITE_VISIBILITY = "write/SET_WRITE_VISIBILITY";
const CHANGE_INPUT = "write/CHANGE_INPUT";

export const setWriteVisibility = createAction(SET_WRITE_VISIBILITY); // visible
export const changeInput = createAction(CHANGE_INPUT);

const initialState = Map({
  visible: false,
  text: ""
});

export default handleActions(
  {
    [SET_WRITE_VISIBILITY]: (state, action) => {
      return state.set("visible", action.payload);
    },
    [CHANGE_INPUT]: (state, action) => {
      return state.set("text", action.payload);
    }
  },
  initialState
);
