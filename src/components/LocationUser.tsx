import { useEffect, useState } from "react";
import { Marker, useMap, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import type { searchApi } from "../types/searchApi";
export default function LocationUser({
	selectedPosition,
}: { selectedPosition: searchApi }) {
	// Default position
	const defaultPosition: searchApi = {
		geometry: {
			coordinates: [48.8566, 2.3522],
		},
		properties: {
			label: "Recherche de position en cours",
		},
	};

	const [position, setPosition] = useState(defaultPosition);

	console.log(position);

	const map = useMap();

	/* const LeafIcon = L.Icon.extend({
		options: {
			iconSize: [95, 31],
			iconAnchor: [45, 45],
			popupAnchor: [0, -42],
		},
	});
 */

	const LeafIcon = L.Icon.extend({
		options: {
			iconUrl: "../icons8-voiture-64.png",
			iconSize: [64, 64],
			iconAnchor: [32, 64],
			popupAnchor: [0, -42],
		},
	});

	const carIcon = new LeafIcon();

	// GPS or automatic position of the web browser
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		map.locate({
			setView: true,
			maxZoom: 13,
		});
		map.on("locationfound", (e) => {
			const positionFound: searchApi = {
				geometry: {
					coordinates: [e.latlng.lat, e.latlng.lng],
				},
				properties: {
					label: "Ma position",
				},
			};
			setPosition(positionFound);
		});
	}, []);

	console.log(position);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (selectedPosition !== null) {
			map.flyTo(
				[
					selectedPosition.geometry.coordinates[1],
					selectedPosition.geometry.coordinates[0],
				],
				14,
			);
			const positionPut: searchApi = {
				geometry: {
					coordinates: [
						selectedPosition.geometry.coordinates[1],
						selectedPosition.geometry.coordinates[0],
					],
				},
				properties: {
					label: selectedPosition.properties.label,
				},
			};
			setPosition(positionPut);
			console.log(`Dans flyTo ${position}`);
		}
	}, [selectedPosition]);
	//[latitude, longitude]

	return (
		<Marker
			position={[
				position.geometry.coordinates[0],
				position.geometry.coordinates[1],
			]}
			icon={carIcon}
		>
			<CircleMarker
				center={[
					position.geometry.coordinates[0],
					position.geometry.coordinates[1],
				]}
				pathOptions={{ color: "purple", opacity: 0.4 }}
				radius={40}
			/>
			<Tooltip direction="top" offset={[0, -45]} opacity={1}>
				You are here : {position.properties.label}
			</Tooltip>
		</Marker>
	);
}
