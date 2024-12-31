import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

//import { Icon, divIcon, point } from "leaflet";
import LocationUser from "./LocationUser";

// create custom icon

// markers
const markers = [
	{
		geocode: [48.86, 2.3522],
		popUp: "Hello, I am pop up 1",
	},
	{
		geocode: [48.85, 2.3522],
		popUp: "Hello, I am pop up 2",
	},
	{
		geocode: [48.885, 2.34],
		popUp: "Hello, I am pop up 3",
	},
];

// [48.8566, 2.3522]

export default function Maps({ selectedPosition }) {
	/* 	console.log(selectedItem.coordinates[0]);
	console.log(selectedItem.coordinates[1]); */

	return (
		<>
			<MapContainer center={[48.8566, 2.3522]} zoom={13}>
				{/* OPEN STREEN MAPS TILES */}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<MarkerClusterGroup chunkedLoading>
					<Marker position={markers[0].geocode}>
						<Popup>{markers[0].popUp}</Popup>
					</Marker>

					<Marker position={markers[1].geocode}>
						<Popup>{markers[1].popUp}</Popup>
					</Marker>

					<Marker position={markers[2].geocode}>
						<Popup>{markers[2].popUp}</Popup>
					</Marker>

					{/* 					<Marker
						position={[
							selectedItem.coordinates[0],
							selectedItem.coordinates[1],
						]}
					>
						<Popup>
							{[selectedItem.coordinates[0], selectedItem.coordinates[1]]}
						</Popup>
					</Marker> */}
				</MarkerClusterGroup>
				<LocationUser selectedPosition={selectedPosition} />
			</MapContainer>
		</>
	);
}
