/**
 * Recibe un nombre y retorna un objeto con ese nombre dividido en 4
 * @param {string} srtNombre Nombre completo que se quiere desestructurar
 * @returns {object} Nombre divido
 */
export const splitNombre = (srtNombre) => {
	const [primerNombre = '', segundoNombre = '', primerApellido = '', segundoApellido = ''] = srtNombre.split(' ');
	return {
		primerNombre,
		segundoNombre,
		primerApellido,
		segundoApellido,
	};
};
