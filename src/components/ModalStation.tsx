import { MouseEventHandler } from "react";

export default function ModalStation({
  onClose,
  stationId,
}: {
  onClose: MouseEventHandler;
  stationId: string;
}) {
  return (
    <div className="modal">
      <div>
        <h1>Voici la postion</h1>{" "}
      </div>
      Id de la sation : {stationId}
      <button onClick={onClose}>Close</button>
      {}
    </div>
  );
}
