"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar2() {
	const data = [
		"Abricot",
		"Artichaut",
		"Banane",
		"Brocoli",
		"Cerise",
		"Chou",
		"Datte",
		"Dinde",
	];

	const [query, setQuery] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);

	// Filtre les données en fonction de l'entrée utilisateur
	const filterData = (input) => {
		return data.filter((item) =>
			item.toLowerCase().startsWith(input.trim().toLowerCase()),
		);
	};

	// Gère le changement de valeur dans le champ de recherche
	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);

		setFilteredData(value.trim() === "" ? [] : filterData(value));
	};

	// Gère le clic sur une suggestion
	const handleSuggestionClick = (suggestion) => {
		setQuery(suggestion);
		setFilteredData([]);
		setSelectedItems(filterData(suggestion));
	};

	// Gère le clic sur le bouton Rechercher
	const handleSearchClick = () => {
		setSelectedItems(query.trim() !== "" ? filterData(query) : []);
		setFilteredData([]);
	};

	return (
		<section>
			<div>
				{/* Champ de recherche */}
				<div>
					<input
						type="text"
						value={query}
						onChange={handleInputChange}
						placeholder="Rechercher..."
					/>
				</div>

				{/* Bouton Rechercher */}
				<div>
					<button type="button" onClick={handleSearchClick}>
						<Search />
						Rechercher
					</button>
				</div>
			</div>

			{/* Liste des suggestions */}
			{filteredData.length > 0 && (
				<ul>
					{filteredData.map((item, index) => (
						<li key={index} onClick={() => handleSuggestionClick(item)}>
							{item}
						</li>
					))}
				</ul>
			)}

			{/* Affichage des cartes sélectionnées */}
			{selectedItems.length > 0 && (
				<div>
					{selectedItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<h3>{item}</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
								officiis debitis repellat aspernatur eligendi fugiat dolorum
								accusamus maiores quae labore odio ex, obcaecati nobis velit
								sapiente vel aut praesentium? Dolore!
							</p>
						</motion.div>
					))}
				</div>
			)}
		</section>
	);
}
