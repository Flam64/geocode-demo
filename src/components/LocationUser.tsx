import { useEffect, useState } from "react";
import { Marker, Popup, useMap, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";

export default function LocationUser({ selectedPosition }) {
	// Default position
	const defaultPosition = [48.856, 2.3522];

	const [position, setPosition] = useState(defaultPosition);

	const map = useMap();

	const LeafIcon = L.Icon.extend({
		options: {
			iconSize: [95, 31],
			iconAnchor: [45, 45],
			popupAnchor: [0, -42],
		},
	});
	const carIcon = new LeafIcon({ iconUrl: "../car.png" });

	// GPS or automatic position of the web browser
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		map.locate({
			setView: true,
			maxZoom: 13,
		});
		map.on("locationfound", (e) => {
			setPosition([e.latlng.lat, e.latlng.lng]);
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (selectedPosition.length !== 0) {
			map.flyTo(
				[selectedPosition.coordinates[1], selectedPosition.coordinates[0]],
				14,
			);

			setPosition([
				selectedPosition.coordinates[1],
				selectedPosition.coordinates[0],
			]);
		}
	}, [selectedPosition]);
	//[latitude, longitude]
	return (
		<Marker position={position} icon={carIcon}>
			<CircleMarker
				center={position}
				pathOptions={{ color: "purple", opacity: 0.4 }}
				radius={40}
			/>
			<Tooltip direction="top" offset={[0, -45]} opacity={1}>
				You are here
			</Tooltip>
		</Marker>
	);
}
