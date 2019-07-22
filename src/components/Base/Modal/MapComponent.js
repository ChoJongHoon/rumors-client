import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";
import oc from "open-color";
const MapComponent = withScriptjs(
  withGoogleMap(
    ({ latitude, longitude, postLatitude, postLongitude, likesCoords }) => {
      return (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: postLatitude, lng: postLongitude }}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
          <Circle
            radius={3000}
            center={{ lat: postLatitude, lng: postLongitude }}
            options={{ strokeColor: oc.red[6], fillColor: oc.red[4] }}
          />
          {likesCoords.map((item, idx) => (
            <Circle
              key={idx}
              radius={3000}
              center={{
                lat: Number(item.like_latitude),
                lng: Number(item.like_longitude)
              }}
              options={{ strokeColor: oc.violet[6], fillColor: oc.violet[4] }}
            />
          ))}
        </GoogleMap>
      );
    }
  )
);

export default MapComponent;
