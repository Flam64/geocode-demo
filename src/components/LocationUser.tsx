import { LatLng, latLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function LocationUser({ selectedItem }) {
	const defaultPosition = [48.856, 2.3522];

	const [position, setPosition] = useState(defaultPosition);

	const map = useMap();
	// Default position
	/* 	let lat = 48.856;
	let lng = 2.3522; */

	// GPS or automatic position of the web browser
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		map.locate({
			setView: true,
			maxZoom: 13,
		});

		map.on("locationfound", (e) => {
			setPosition(e.latlng);
		});
	}, []);

	if (selectedItem.length !== 0) {
		const defaultPosition = [
			selectedItem.coordinates[1],
			selectedItem.coordinates[0],
		];
		//defaultPosition.push(selectedItem.coordinates[0]);
		map.flyTo([selectedItem.coordinates[1], selectedItem.coordinates[0]], 14);
	}

	return (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
}
