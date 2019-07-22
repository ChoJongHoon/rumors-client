import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as AuthAPI from "lib/api/auth";
import { Map } from "immutable";

const CHANGE_INPUT = "auth/CHANGE_INPUT"; // input 값 변경
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"; // form 초기화

const CHECK_ID_EXISTS = "auth/CHECK_ID_EXISTS"; // 이메일 중복 확인
const REGISTER = "auth/REGISTER";
const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";
const SET_ERROR = "auth/SET_ERROR"; // 오류 설정
const SET_EMAIL_CONFIRM = "auth/SET_EMAIL_CONFIRM";

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form

export const checkIdExists = createAction(
  CHECK_ID_EXISTS,
  AuthAPI.checkIdExists
); // email
export const register = createAction(REGISTER, AuthAPI.register); // { email, username, password }
export const login = createAction(LOGIN, AuthAPI.login); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);

export const setError = createAction(SET_ERROR); // { form, message }
export const setEmailConfirm = createAction(SET_EMAIL_CONFIRM); // { form, code}

const initialState = Map({
  register: Map({
    form: Map({
      email: "",
      code: "",
      username: "",
      password: "",
      passwordConfirm: ""
    }),
    exists: Map({
      email: false,
      password: false
    }),
    error: null,
    emailConfirm: null
  }),
  login: Map({
    form: Map({
      email: "",
      password: ""
    }),
    error: null
  }),
  result: Map({})
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, "form", name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    ...pender({
      type: CHECK_ID_EXISTS,
      onSuccess: (state, action) =>
        state.setIn(["register", "exists", "email"], action.payload.data.exists)
    }),
    ...pender({
      type: REGISTER,
      onSuccess: (state, action) =>
        state.set("result", Map(action.payload.data))
    }),
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) =>
        state.set("result", Map(action.payload.data))
    }),
    [SET_ERROR]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, "error"], message);
    },
    [SET_EMAIL_CONFIRM]: (state, action) => {
      const { form, code } = action.payload;
      return state.setIn([form, "emailConfirm"], code);
    }
  },
  initialState
);
