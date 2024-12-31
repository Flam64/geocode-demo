import { useState, useEffect } from "react";
import "./searchBar.css";
import type { searchApi } from "../types/searchApi";

import Maps from "./Maps";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<searchApi[] | null>([]);
	const [searchDone, setSearchDone] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState<searchApi[] | null>(
		[],
	);

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

	// Filtre les données en fonction de l'entrée utilisateur
	const filterData = (element) => {
		return results.filter((item) =>
			item.properties.label
				.toLowerCase()
				.includes(element.trim().toLowerCase()),
		);
	};

	const handleSearch = (e) => {
		const value = e.target.value;

		if (searchDone) {
			setSearchDone(false);
		} else {
			setQuery(value);
			if (value.length > 2) {
				// Appel à votre API pour récupérer les résultats de recherche
				setResults(value.trim() === "" ? [] : filterData(value));
			}
		}
	};

	// Gère le clic sur une suggestion
	const handleElementClick = (element) => {
		setQuery(element.properties.label);
		setResults([]);
		setSearchDone(true);
		setSelectedPosition(element.geometry);
	};
	return (
		<>
			<div className="search-bar">
				<input
					type="search"
					value={query}
					onChange={handleSearch}
					placeholder="Rechercher..."
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
			<Maps selectedPosition={selectedPosition} />
			{/* {searchDone && <LocationUser coordonnees={selectedItem.geometry.coordinates} />} coordonnees={selectedItem.geometry.coordinates} */}
		</>
	);
}
