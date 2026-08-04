import { FARE_PER_KM, BASE_FARE } from "./constants";

export const calculateFare = (distanceKm) => {
  if (!distanceKm || distanceKm <= 0) return 0;
  return Math.round(BASE_FARE + distanceKm * FARE_PER_KM);
};

export const getFareRange = (distanceKm) => {
  if (!distanceKm || distanceKm <= 0) return { min: 0, max: 0 };
  return {
    min: Math.round(BASE_FARE + distanceKm * 15),
    max: Math.round(BASE_FARE + distanceKm * 18),
  };
};