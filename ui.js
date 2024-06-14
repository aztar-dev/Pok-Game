let myTurn = true;
let myPokemonStats;
let enemyPokemonStats;

const hideSearchBar = () => {
	searchBox.value = "";
	searchBox.classList.add("hidden");
	suggestionsContainer.innerHTML = "";
	suggestionsContainer.classList.add("hidden");
};

const suggestPokemon = (pokemon) => {
	let suggestionItem = document.createElement("div");
	suggestionItem.classList.add("suggestion-item");
	suggestionItem.textContent = pokemon.name.fr;
	suggestionsContainer.appendChild(suggestionItem);
	return suggestionItem;
};

const searchPokemon = (search) => {
	suggestionsContainer.innerHTML = ""; // Supprime les anciennes suggestions qui ne sont plus valides après avoir ajouté des caractères
	if (search) {
		// Filtre de la liste de tous les pokemon pour ne garder que ceux qui correspondent à ce qu'on tape
		const filteredData = pokeList.filter((poke) => poke.name.fr.toLowerCase().includes(search));

		filteredData.forEach((poke) => {
			const suggestedPoke = suggestPokemon(poke);

			// Event au clic pour mettre le nom dans la barre de recherche et l'afficher en dessous
			suggestedPoke.addEventListener("click", () => {
				myPokemonStats = selectPokemon(poke);
				enemyPokemonStats = generateOpponentPokemon();
				hideSearchBar();
				displayTurn();
				displayMenu();
			});
		});
	}
};

const displayPokemon = (pokemon, type) => {
	let container = document.querySelector("." + type);
	// Display image
	let pokeImg = container.querySelector("img");
	let pokeSprite = getPokeSprite(pokemon);
	pokeImg.setAttribute("src", pokeSprite);
	// Display name
	let span = container.querySelector(".name span");
	span.textContent = pokemon.name.fr;
	// Display HP bar
	let fightContainer = document.querySelector(".fight-container");
	fightContainer.classList.remove("hidden");
};

const switchMenu = () => {
	if (myTurn) {
		// hideMenu();
		displayTurn();
	} else {
		displayTurn();
	}
};

const displayTurn = () => {
	let infosContainer = document.querySelector(".fight-infos");
	let infosPar = infosContainer.querySelector("p");
	if (myTurn) {
		infosPar.textContent = "C'est à votre tour de jouer !";
		infosContainer.classList.remove("opponent-turn");
	} else {
		infosPar.textContent = "C'est au tour de votre adversaire !";
		infosContainer.classList.add("opponent-turn");
	}

	if (infosContainer.classList.contains("hidden")) {
		infosContainer.classList.remove("hidden");
	}
};

const displayMenu = () => {
	let menu = document.querySelector(".game-menu");
	menu.classList.remove("hidden");
};

// const hideMenu = () => {
// 	let menu = document.querySelector(".game-menu");
// 	menu.classList.add("hidden");
// };
