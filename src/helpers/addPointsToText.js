/**
 * Recibe una cadena de texto y la formatea, retornando el numero de caracteres especificados mas caracteres al final
 * de la cadena
 * @function replaceCharacters
 * @param {string} text Texto al que se dara formato
 * @param {[number=35]} numberCharacters Numero de caracteres permitidos
 * @param {[string='...']} chartsEnd Caracteres que se agregaran al final del texto formateado
 * @returns {string} Texto formateado con los caracteres seleccionados
 */
// Solo te muestra el texto asta donde tu le especificas y al final muestra el caracter que tu le envies
export const replaceCharacters = (text, numberCharacters = 35, chartsEnd = '...') => {
	let characters = '';
	if (text.length > numberCharacters) characters = `${text.substring(0, numberCharacters)}${chartsEnd}`;
	else characters = text;
	return characters;
};
