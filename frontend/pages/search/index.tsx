import React, { useEffect, useState } from "react";

import { SalonsDto } from "../../../backend/src/salons/dto/salons.dto";
import Map from "../../components/maps/map";
import { usePosition } from "../../components/maps/usePosition";
import Table from "../../components/table/table";
import api from "../../core/api";

export default function Search() {
  const { latitude, longitude, error } = usePosition();

  const [salons, setSalons] = useState<SalonsDto[]>([]);

  const fetchSalons = (lat: number, lang: number) => {
    api
      .get<SalonsDto[]>(`/salons?lat=${lat}&lng=${lang}&radius=10000`)
      .then((res) => setSalons(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchSalons(latitude, longitude);
    }
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 p-0">
          <Map
            salons={salons}
            latitude={latitude}
            longitude={longitude}
            mapElement={<div style={{ height: `100%` }} />}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="map-container" />}
            loadSalons={(lat, lang) => fetchSalons(lat, lang)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdg1dvVXxiSKbR0Ul6Q2WahmmoRPDPSa8&v=3.exp&libraries=geometry,drawing,places"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <Table salons={salons} />
        </div>
      </div>
    </div>
  );
}
