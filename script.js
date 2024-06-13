let pokeList;

const searchBox = document.getElementById("searchBox");
const suggestionsContainer = document.getElementById("suggestions");
const pokeCards = document.querySelectorAll(".poke-card");

const init = async () => {
	pokeList = await getPokeList();
	whoBegins();
};

init();

// EVENT LISTENER RECHERCHE POKEMON

searchBox.addEventListener("input", () => {
	suggestionsContainer.classList.remove("hidden");
	const search = searchBox.value.toLowerCase();
	searchPokemon(search);
});

pokeCards.forEach((card) => {
	card.addEventListener("click", () => {
		if (card.classList.contains("selected")) {
			loseHP(selectedPokemon, 10);
		} else {
			loseHP(opponentPokemon, 10);
		}
	});
});
