import { LatLng, latLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function LocationUser({ selectedItem }) {
  const defaultPosition = [48.856, 2.3522];

  const [position, setPosition] = useState(defaultPosition);

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
      //setPosition(e.latlng);
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
    });
    console.info(latitude);
    console.log(longitude);
  }, []);

  if (selectedItem.length !== 0) {
    latitude = selectedItem.coordinates[1];
    longitude = selectedItem.coordinates[0];
    map.flyTo([latitude, longitude], 14);
    //setPosition(());
  }

  return (
    <Marker position={[latitude, longitude]}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
