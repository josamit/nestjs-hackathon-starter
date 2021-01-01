import React, { FC } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

import { SalonsDto } from "../../../backend/src/salons/dto/salons.dto";

export const parsePoint = (point: string): string[] => {
  return point
    .replace(/[^\d .-]/g, "")
    .trim()
    .split(/\s+/);
};

export type MapProps = {
  latitude: number;
  longitude: number;
  salons: SalonsDto[];
  loadSalons: (lat: number, lang: number) => void;
};

const Map: FC<MapProps> = ({ latitude, longitude, salons, loadSalons }) => {
  const mapRef: React.RefObject<GoogleMap> = React.createRef<GoogleMap>();

  return (
    <>
      <GoogleMap
        ref={mapRef}
        onIdle={() => {
          const ne = mapRef.current.getBounds().getNorthEast();
          const sw = mapRef.current.getBounds().getSouthWest();
          loadSalons(ne.lat(), sw.lng());
        }}
        onClick={(e) => console.log("clicked on map", e)}
        defaultZoom={13}
        defaultCenter={{
          lat: latitude || 0,
          lng: longitude || 0,
        }}
      >
        {salons.map((salon) => {
          const coordinates = parsePoint(salon.coordinate);
          return (
            <Marker
              key={salon.id}
              position={{
                lat: parseFloat(coordinates[0]),
                lng: parseFloat(coordinates[1]),
              }}
            />
          );
        })}
      </GoogleMap>
    </>
  );
};

export default withScriptjs(withGoogleMap(Map));
