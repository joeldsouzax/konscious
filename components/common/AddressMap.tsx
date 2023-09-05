"use client";
import * as React from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";

const mapStyles = {
  width: "100%",
  height: "50%",
};
interface AddressMapProps {
  long: number;
  lat: number;
}

const AddressMap: React.FC<AddressMapProps> = ({ lat, long }) => {
  const mapCenter = React.useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    []
  );

  const mapOptions = React.useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      onLoad={(map) => console.log("Map Loaded")}
    >
      <MarkerF
        position={mapCenter}
        onLoad={() => console.log("Marker Loaded")}
      />
    </GoogleMap>
  );
};

export default AddressMap;
