import axios from "axios";

export const weather = () =>
  axios.get(
    "//api.openweathermap.org/data/2.5/weather?lat=37.5614923&lon=126.8283237&appid=d2452c6524f6cc67ba21bb0749157b90"
  );
