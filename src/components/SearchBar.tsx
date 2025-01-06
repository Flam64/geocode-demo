import { useState, useEffect } from "react";
import "./searchBar.css";
import type { searchApi } from "../types/searchApi";

//import Maps from "./Maps";

export default function SearchBar({ setSelectedPosition }) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<searchApi[]>([]);
	const [searchDone, setSearchDone] = useState(false);
	/* 	const [selectedPosition, setSelectedPosition] = useState<searchApi | null>(
		null,
	); */

	const handleKeyUp = (event: { key: string }) => {
		event.key === "Enter";
	};

	useEffect(() => {
		if (!searchDone) {
			if (query.length > 2) {
				// timer pour temporiser l'appel de l'API
				const timeDelay = setTimeout(() => {
					fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=15`)
						.then((Response) => Response.json())
						.then((data) => setResults(data.features))
						.catch((error) => console.error(error));
				}, 500);
				return () => {
					// clean timer count
					clearTimeout(timeDelay);
				};
			}
		}
	}, [query, searchDone]);

	console.log(results);

	// Filter data based on user input
	const filterData = (element: searchApi) => {
		return results?.filter((item) =>
			item.properties.label
				.toLowerCase()
				.includes(element.properties.label.trim().toLowerCase()),
		);
	};

	const handleSearch = (e) => {
		const value = e.target.value;
		console.table(value);

		if (searchDone) {
			setSearchDone(false);
		} else {
			setQuery(value);
			if (value.length > 2) {
				// Appel API pour récupérer les résultats de recherche
				setResults(value.trim() === "" ? [] : filterData(value));
			}
		}
	};

	// Gère le clic sur une suggestion
	const handleElementClick = (element: searchApi) => {
		if (element != null) {
			setQuery(element.properties.label);
			setResults([]);
			setSearchDone(true);
			// setSelectedPosition(element.geometry);
			setSelectedPosition(element);
		}
	};
	return (
		<>
			<div className="search-bar">
				<input
					type="search"
					value={query}
					onChange={handleSearch}
					placeholder="Rechercher un lieu..."
				/>

				<ul>
					{query.length > 2 &&
						results?.map((item, index) => (
							<li
								key={index}
								onClick={() => handleElementClick(item)}
								onKeyUp={handleKeyUp}
							>
								{item.properties.label}
							</li>
						))}
				</ul>
			</div>
			{/* <Maps selectedPosition={selectedPosition} /> */}
		</>
	);
}
