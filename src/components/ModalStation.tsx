export default function ModalStation({ onClose }) {
	return (
		<div className="modal">
			<div>Voici la postion </div>
			<button onClick={onClose}>Close</button>
		</div>
	);
}
