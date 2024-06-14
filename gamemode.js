let selectedPokemon;
let opponentPokemon;

const whoBegins = () => {
	let random = Math.random();
	myTurn = random >= 0.5 ? false : myTurn;
};

const isPokeShiny = () => {
	const random = Math.random();
	if (random < 0.9) {
		return false;
	} else {
		return true;
	}
};

const getPokeSprite = (pokemon) => {
	if (isPokeShiny()) {
		return pokemon.sprites.shiny;
	} else {
		return pokemon.sprites.regular;
	}
};

const selectPokemon = (poke) => {
	selectedPokemon = poke;
	selectedHP = selectedPokemon.stats.hp;
	displayPokemon(selectedPokemon, "selected");
	let selectedPokemonStats = getPokeStats(selectedPokemon);
	return selectedPokemonStats;
};

const generateOpponentPokemon = () => {
	opponentPokemon = getRandomPokemon(pokeList);
	opponentHP = opponentPokemon.stats.hp;
	displayPokemon(opponentPokemon, "opponent");
	let opponentPokemonStats = getPokeStats(opponentPokemon);
	return opponentPokemonStats;
};

const getRandomPokemon = (pokeList) => {
	// Il nous faut un aléatoire entre 1 et 1025 inclus (pour index 1025 = 1026è élément du tableau)
	let random = Math.floor(Math.random() * (pokeList.length - 1)) + 1;
	let pokeOpponent = pokeList[random];
	return pokeOpponent;
};

const getPokeStats = (pokemon) => {
	const pokemonStats = {
		name: pokemon.name.fr,
		currenthp: pokemon.stats.hp,
		maxhp: pokemon.stats.hp,
		atk: pokemon.stats.atk,
		def: pokemon.stats.def,
		vit: pokemon.stats.vit,
	};
	return pokemonStats;
};

const loseHP = (pokemon) => {
	let container;
	let percentHP;
	switch (pokemon) {
		case myPokemonStats:
			calculateDmg(pokemon, "selected");
			myTurn = true;
			break;
		case enemyPokemonStats:
			calculateDmg(pokemon, "opponent");
			myTurn = false;
			break;
	}

	container = obj.container;
	percentHP = obj.percentHP;
	container.querySelector(".progress").style.width = percentHP + "%";

	checkEndGame(pokemon);
};

const calculateDmg = (pokemon, type) => {
	container = document.querySelector("." + type);
	let random = Math.random() * 2 + 1;
	let amount = Math.floor((pokemon.atk * random) / 15);

	if (pokemon.currenthp - amount >= 0) {
		pokemon.currenthp -= amount;
	} else {
		pokemon.currenthp = 0;
	}

	percentHP = (pokemon.currenthp / pokemon.maxhp) * 100;

	return (obj = {
		container: container,
		percentHP: percentHP,
	});
};

const checkEndGame = (pokemon) => {
	if (pokemon.currenthp === 0) {
		console.log("GAME OVER");
	}
};
