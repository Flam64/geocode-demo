import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Routing = ({ start, end }) => {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		if (start != null && end != null) {
			// Create a routing control and add it to the map
			const routingControl = L.Routing.control({
				waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
				routeWhileDragging: false,
				lineOptions: {
					styles: [{ color: "#FF0000", weight: 6 }],
				},
				show: false,
			}).addTo(map);

			return () => {
				map.removeControl(routingControl);
			};
		}
	}, [map, start, end]);

	return null;
};

export default Routing;
