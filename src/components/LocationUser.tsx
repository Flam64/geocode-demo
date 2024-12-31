import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

type coordinatesType = {
	latitude: number;
	longitude: number;
};

export default function LocationUser({ selectedPosition }) {
	const defaultPosition = { latitude: 48.856, longitude: 2.3522 };

	const [position, setPosition] = useState<coordinatesType>(defaultPosition);

	const map = useMap();
	// Default position
	let latitude = 48.856;
	let longitude = 2.3522;

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
		console.info(latitude);
		console.log(longitude);
	}, []);

	if (selectedPosition.length !== 0) {
		latitude = selectedPosition.coordinates[1];
		longitude = selectedPosition.coordinates[0];
		map.flyTo([latitude, longitude], 14);
		const newPosition = defaultPosition;
		newPosition.latitude = latitude;
		newPosition.longitude = longitude;
		setPosition(newPosition);
	}
	//[latitude, longitude]
	return (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
}
