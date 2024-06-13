const isPokeShiny = () => {
	const random = Math.random();
	if (random < 0.9) {
		return false;
	} else {
		return true;
	}
};

const suggestPokemon = (pokemon) => {
	const suggestionItem = document.createElement("div");
	suggestionItem.classList.add("suggestion-item");
	suggestionItem.textContent = pokemon.name.fr;
	suggestionsContainer.appendChild(suggestionItem);
	return suggestionItem;
};

const chosePokemon = (pokemon) => {
	const selectedPokeContainer = document.querySelector(".selected-name");
	const pokeImg = document.querySelector(".poke-img");
	searchBox.value = pokemon.name.fr;
	selectedPokeContainer.textContent = `Pokémon sélectionné : ${pokemon.name.fr}`;
	suggestionsContainer.innerHTML = ""; // Supprime les suggestions une fois que j'ai fait mon choix
	const pokeSprite = getPokeSprite(pokemon);
	pokeImg.setAttribute("src", pokeSprite);
};

const getPokeSprite = (pokemon) => {
	if (isPokeShiny()) {
		return pokemon.sprites.shiny;
	} else {
		return pokemon.sprites.regular;
	}
};

const choseOpponent = (pokemonList) => {
	console.log(pokemonList);
	// Il nous faut un aléatoire entre 1 et 1025 inclus (pour index 1025 = 1026è élément du tableau)
	const random = Math.floor(Math.random() * (pokemonList.length - 1)) + 1;
	const pokeOpponent = pokemonList[random];
	console.log(pokeOpponent);

	// TODO Ajouter l'adversaire
	const selectedOpponentContainer = document.querySelector("#selected-opponent");
	const pokeImg = document.querySelector(".opponent-img");
	selectedOpponentContainer.textContent = `Votre adversaire est : ${pokeOpponent.name.fr}`;
	const pokeSprite = getPokeSprite(pokeOpponent);
	pokeImg.setAttribute("src", pokeSprite);
	console.log(pokemonList[random].name.fr);
};
