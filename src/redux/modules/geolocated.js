import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as WeatherAPI from "lib/api/weather";
import * as PostAPI from "lib/api/post";
import { Map } from "immutable";

const SET_COORDS = "geolocated/SET_COORDS";
const SET_WEATHER = "geolocated/SET_WEATHER";
const SET_MAPS_POST_COORDS = "geolocated/SET_MAPS_POST_COORDS";
const SET_MAPS_VISIBILITY = "geolocated/SET_MAPS_VISIBILITY";
const SET_MAPS_POST_NO = "geolocated/SET_MAPS_POST_NO";
const SET_MAPS_LIKES_COORDS = "geolocated/SET_MAPS_LIKES_COORDS";

export const setCoords = createAction(SET_COORDS);
export const setWeather = createAction(SET_WEATHER, WeatherAPI.weather);
export const setPostCoords = createAction(SET_MAPS_POST_COORDS);
export const setMapsVisibility = createAction(SET_MAPS_VISIBILITY);
export const setMapsPostNo = createAction(SET_MAPS_POST_NO);
export const setMapsLikesCoords = createAction(
  SET_MAPS_LIKES_COORDS,
  PostAPI.selectLikes
);

const initialState = Map({
  coords: Map({
    latitude: null,
    longitude: null
  }),
  weather: Map({
    temp: null,
    country: null,
    city: null,
    icon: null
  }),
  maps: Map({
    visible: false,
    postNo: null,
    coords: Map({
      latitude: null,
      longitude: null
    }),
    likesCoords: []
  })
});

export default handleActions(
  {
    [SET_COORDS]: (state, action) => state.set("coords", Map(action.payload)),
    [SET_MAPS_POST_COORDS]: (state, action) =>
      state.setIn(["maps", "coords"], Map(action.payload)),
    [SET_MAPS_VISIBILITY]: (state, action) =>
      state.setIn(["maps", "visible"], action.payload),
    [SET_MAPS_POST_NO]: (state, action) =>
      state.setIn(["maps", "postNo"], action.payload),
    ...pender({
      type: SET_WEATHER,
      onSuccess: (state, action) =>
        state
          .setIn(
            ["weather", "temp"],
            (action.payload.data.main.temp - 273.15).toFixed(1)
          )
          .setIn(["weather", "city"], action.payload.data.name)
          .setIn(["weather", "country"], action.payload.data.sys.country)
          .setIn(
            ["weather", "icon"],
            action.payload.data.weather[0].description
          )
    }),
    ...pender({
      type: SET_MAPS_LIKES_COORDS,
      onSuccess: (state, action) =>
        state.setIn(["maps", "likesCoords"], action.payload.data)
    })
  },
  initialState
);
