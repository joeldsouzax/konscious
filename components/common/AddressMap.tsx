"use client";
import * as React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_API!,
});

interface AddressMapProps {
  long: number;
  lat: number;
}

const AddressMap: React.FC<AddressMapProps> = ({ lat, long }) => {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}
      >
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  ); // in render()
};

export default AddressMap;
