import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const Map = ({ center, zoom }) => {
  const [distance, setDistance] = useState(null);

  // useEffect(() => {
  //   const origin = "Paris, France";
  //   const destination = "Marseille, France";
  //   const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_API_KEY}`;
  //
  //   fetch(apiUrl, {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.rows && data.rows.length > 0) {
  //         const distanceText = data.rows[0].elements[0].distance.text;
  //         setDistance(distanceText);
  //       }
  //     });
  // }, []);

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent lat={center.lat} lng={center.lng} text="Marker" />
      </GoogleMapReact>
      <div>{distance}</div>
    </div>
  );
};
