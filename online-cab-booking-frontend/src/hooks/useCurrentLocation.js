import { useState } from "react";

export default function useCurrentLocation() {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoading(false);
          resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        },
        (err) => {
          setLoading(false);
          reject(err.message);
        }
      );
    });
  };

  return { getCurrentLocation, loading };
}