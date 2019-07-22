import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { media } from "lib/styleUtils";
import "weather-icons/css/weather-icons.css";

const Wraper = styled.div`
  margin: 1rem;
  display: flex;
  ${media.tablet`
    position: absolute;
    top: 0;
    left: 0;
    margin: 1rem;
  `}
`;

const InfoWraper = styled.div`
  margin-left: 1rem;
  text-align: center;
  ${media.tablet`
    margin-left: .25rem;
    margin-top: .25rem;
  `}
`;

const Temp = styled.div`
  font-size: 2rem;
  ${media.tablet`
    font-size: 1rem;
  `}
`;

const City = styled.div`
  font-size: 0.75rem;
  font-style: italic;
  ${media.tablet`
    font-size: 0.5rem;
  `}
`;

const Icon = styled.i`
  ${"" /* width: 3.75rem;
  height: 3.75rem; */}
  font-size: 3.5rem;
  color: ${oc.violet[7]};
  ${media.tablet`
    ${"" /* width: 2.5rem;
    height: 2.5rem; */}
    font-size: 2.5rem;
  `};
`;
const Weather = ({ temp, city, country, icon }) => {
  if (!temp) {
    return null;
  }
  return (
    <Wraper>
      {/* <Icon src="http://openweathermap.org/img/w/50d.png" /> */}
      <Icon className={"wi wi-day-haze" /*+ icon*/} />
      <InfoWraper>
        <Temp>{temp}°C</Temp>
        <City>
          {city}, {country}
        </City>
      </InfoWraper>
    </Wraper>
  );
};

export default Weather;
