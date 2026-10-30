import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Alert, Box, LinearProgress } from "@mui/material";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchCachedRoute } from "../../shared/helpers/route-cache";
import "./lead-map.css";

const createMarkerIcon = (label) =>
  L.divIcon({
    className: "custom-marker-wrapper",
    html: `<div class="map-marker"><div class="map-marker__circle"><div class="map-marker__content">${label}</div></div></div>`,
    iconSize: [34, 48],
    iconAnchor: [17, 48],
  });

const getPosition = (point) => {
  if (point?.lat == null || point?.lon == null) return null;
  if (String(point.lat).trim() === "" || String(point.lon).trim() === "")
    return null;
  const lat = Number(point.lat);
  const lon = Number(point.lon);
  return Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lon) <= 180
    ? [lat, lon]
    : null;
};

function FitRoute({ positions }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(positions, { padding: [40, 50], maxZoom: 13 });
  }, [map, positions]);
  return null;
}

function RouteMap({ points, coordinates }) {
  const { t } = useTranslation();
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchCachedRoute(coordinates)
      .then((result) => {
        if (!cancelled) setRoute(result);
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "map.routeError",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [coordinates]);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        my: 2,
      }}
    >
      {!route && !error && <LinearProgress aria-label={t("map.loading")} />}
      {error && <Alert severity="warning">{t(error)}</Alert>}
      <MapContainer
        center={points[0].position}
        zoom={13}
        style={{ height: "300px", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_33bl_1_e67a46f1e67e6cbad8143c4e"
        />
        {points.map(({ label, position }) => (
          <Marker
            key={label}
            position={position}
            icon={createMarkerIcon(label)}
          />
        ))}
        {route && <Polyline positions={route} color="blue" weight={4} />}
        <FitRoute positions={route || points.map((point) => point.position)} />
      </MapContainer>
    </Box>
  );
}

export default function LeadMap({ leadData }) {
  const { t } = useTranslation();
  const points = [
    { label: "A", position: getPosition(leadData?.from_location) },
    ...(leadData?.waypoints || []).map((point, index) => ({
      label: `P#${index + 1}`,
      position: getPosition(point),
    })),
    { label: "B", position: getPosition(leadData?.to_location) },
  ];

  if (points.some((point) => !point.position)) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        {t("map.coordinatesRequired")}
      </Alert>
    );
  }

  const coordinates = points
    .map(({ position: [lat, lon] }) => `${lon},${lat}`)
    .join(";");
  return (
    <RouteMap key={coordinates} points={points} coordinates={coordinates} />
  );
}
