const api = useApi();

const getPokeList = async () => {
	try {
		const { data } = await api.get("pokemon");
		return data;
	} catch (error) {
		console.error("Une erreur s'est produite : ", error);
	}
};

const getPokeGen = async () => {
	try {
		const { data } = await api.get("gen");
		return data;
	} catch (error) {
		console.error("Une erreur s'est produite : ", error);
	}
};
