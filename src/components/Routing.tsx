import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Routing = ({ start, end }) => {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		// Create a routing control and add it to the map
		const routingControl = L.Routing.control({
			waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
			routeWhileDragging: false,
			lineOptions: {
				styles: [{ color: "#FF0000", weight: 6 }],
			},
		}).addTo(map);

		return () => {
			map.removeControl(routingControl);
		};
	}, [map, start, end]);

	return null;
};

export default Routing;
