import { useState, useEffect } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (e) => {
    setError(e.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return () => console.error("Geolocation is not supported");
    }
    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
