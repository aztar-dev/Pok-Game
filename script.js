let pokeList;
let pokeGen;
let selectedPokemon;
const searchBox = document.getElementById("searchBox");
const suggestionsContainer = document.getElementById("suggestions");

const init = async () => {
	pokeList = await getPokeList();
	pokeGen = await getPokeGen();
};

init();

// EVENT LISTENER RECHERCHE POKEMON

searchBox.addEventListener("input", function () {
	const search = searchBox.value.toLowerCase();
	suggestionsContainer.innerHTML = ""; // Supprime les anciennes suggestions qui ne sont plus valides après avoir ajouté des caractères

	if (search) {
		// Filtre de la liste de tous les pokemon pour ne garder que ceux qui correspondent à ce qu'on tape
		const filteredData = pokeList.filter((poke) => poke.name.fr.toLowerCase().includes(search));

		filteredData.forEach((poke) => {
			const suggestedPoke = suggestPokemon(poke);

			// Event au clic pour mettre le nom dans la barre de recherche et l'afficher en dessous
			suggestedPoke.addEventListener("click", function () {
				chosePokemon(poke);
				choseOpponent(pokeList);
			});
		});
	}
});
