import "./styles.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  MarkerProps,
} from "react-leaflet";
// Pour affiocher la modale
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

import MarkerClusterGroup from "react-leaflet-cluster";
import type { searchApi } from "../types/searchApi";

//import { Icon, divIcon, point } from "leaflet";
import LocationUser from "./LocationUser";
import Routing from "./Routing";
import ModalStation from "./ModalStation";

// create custom icon

// markers
const markers = [
  {
    geocode: [48.86, 2.3822],
    popUp: "FRA6575466",
  },
  {
    geocode: [48.83, 2.3562],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [48.885, 2.34],
    popUp: "Hello, I am pop up 3",
  },
];

// [48.8566, 2.3522]

export default function Maps({
  selectedPosition,
}: {
  selectedPosition: searchApi | null;
}) {
  const [showModal, setShowModal] = useState(false);
  const [ident, setident] = useState("");
  // detection du click sur un Marker

  const handleClick = useCallback((e) => {
    console.log("marker clicked", e.target.options.children.props.children);
    setident(e.target.options.children.props.children);
    setShowModal(true);
  }, []);

  console.info("ident", ident);

  /* const startPoint = {
		lat: 48.86,
		lng: 2.3822,
	};

	if (selectedPosition != null) {
		const latitude = selectedPosition.geometry.coordinates[1];
		const longitude = selectedPosition.geometry.coordinates[0];

		startPoint.lat = latitude;
		startPoint.lng = longitude;
	}

	const endPoint = { lat: 48.86, lng: 2.3822 };
 */
  return (
    <>
      <MapContainer center={[48.8566, 2.3522]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topleft">
          <LayersControl.Overlay name="Power Charge">
            <Marker
              position={markers[1].geocode}
              eventHandlers={{
                click: (e) => {
                  console.log(`Click sur le Marker ${e.latlng}`);
                },
              }}
            >
              <Popup>{markers[1].popUp}</Popup>
            </Marker>
          </LayersControl.Overlay>
          <MarkerClusterGroup chunkedLoading>
            <Marker
              position={markers[0].geocode}
              eventHandlers={{ click: handleClick }}
            >
              <Popup>{markers[0].popUp}</Popup>
            </Marker>

            <Marker position={markers[2].geocode}>
              <Popup>{markers[2].popUp}</Popup>
            </Marker>
          </MarkerClusterGroup>
          <LayersControl.Overlay name="Ma position" checked={true}>
            <LayerGroup>
              <LocationUser selectedPosition={selectedPosition} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {/* <Routing start={startPoint} end={endPoint} /> */}

        {/*ajout de la modal */}
        {showModal &&
          createPortal(
            <ModalStation
              onClose={() => setShowModal(false)}
              stationId={ident}
            />,
            document.body
          )}
      </MapContainer>
    </>
  );
}
