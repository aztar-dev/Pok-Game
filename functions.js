let selectedPokemon;
let opponentPokemon;
let selectedHP;
let opponentHP;

const isPokeShiny = () => {
	const random = Math.random();
	if (random < 0.9) {
		return false;
	} else {
		return true;
	}
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
			suggestedPoke.addEventListener("click", function () {
				selectPokemon(poke);
				searchBox.value = poke.name.fr;
				suggestionsContainer.innerHTML = "";
				suggestionsContainer.classList.add("hidden");
			});
		});
	}
};

const selectPokemon = (poke) => {
	selectedPokemon = poke;
	selectedHP = selectedPokemon.stats.hp;
	opponentPokemon = getRandomPokemon(pokeList);
	opponentHP = opponentPokemon.stats.hp;
	displayPokemon(selectedPokemon, "selected");
	displayPokemon(opponentPokemon, "opponent");
};

const getRandomPokemon = (pokeList) => {
	// Il nous faut un aléatoire entre 1 et 1025 inclus (pour index 1025 = 1026è élément du tableau)
	let random = Math.floor(Math.random() * (pokeList.length - 1)) + 1;
	let pokeOpponent = pokeList[random];
	return pokeOpponent;
};

const loseHP = (pokemon, amount) => {
	let container;
	let percentHP;
	switch (pokemon) {
		case selectedPokemon:
			selectedHP -= amount;
			container = document.querySelector(".selected");
			percentHP = (selectedHP / pokemon.stats.hp) * 100;
			break;
		case opponentPokemon:
			opponentHP -= amount;
			container = document.querySelector(".opponent");
			percentHP = (opponentHP / pokemon.stats.hp) * 100;
			break;
	}
	container.querySelector(".progress").style.width = percentHP + "%";
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

const getPokeSprite = (pokemon) => {
	if (isPokeShiny()) {
		return pokemon.sprites.shiny;
	} else {
		return pokemon.sprites.regular;
	}
};
