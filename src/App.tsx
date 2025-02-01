//import "./App.css";
import Maps from "./components/Maps";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import type { searchApi } from "./types/searchApi";

function App() {
	const [selectedPosition, setSelectedPosition] = useState<searchApi | null>(
		null,
	);
	return (
		<>
			<SearchBar setSelectedPosition={setSelectedPosition} />
			<Maps selectedPosition={selectedPosition} />
		</>
	);
}

export default App;
