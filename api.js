const api = useApi();

const getPokeList = async () => {
	try {
		const { data } = await api.get("pokemon");
		return data;
	} catch (error) {
		console.error("Une erreur s'est produite : ", error);
	}
};
