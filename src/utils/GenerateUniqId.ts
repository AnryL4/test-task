export const generateUniqID = () => {
	return `id_${Date.now()}_${Math.floor(Math.random() * 100)}_${Math.floor(
		Math.random() * 100
	)}_${Math.floor(Math.random() * 100)}`;
};
