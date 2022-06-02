import moment from 'moment';

/**
 * @typedef DataIntervaloTiempo
 * @type {object}
 * @property {(string | Date)} [fInicio=new Date()] - Fecha de inicio del intervalo
 * @property {String} [datos.formatoInicio=DD/MM/YYYY] - Formato que posee la fecha inicial
 * @property {(String | Date)} [datos.fFin=new Date()] - Fecha de finalizacion del intervalo
 * @property {String} [datos.formatoFin=DD/MM/YYYY] - Formato que posee la fecha final del intervalo
 * @property {String} [datos.typeInterval=days] - Tipo de intervalo de fechas [years|days|daysAndHours|hours]
 */

/**
 * Calcula un intervalo de horas, dias o años
 * @function IntervaloTiempo
 * @param {DataIntervaloTiempo} datos - Objeto de datos
 * @returns {number} Intervalo de tiempo transcurrido
 */
const IntervaloTiempo = ({
	fInicio = new Date(),
	formatoInicio = 'DD/MM/YYYY',
	fFin = new Date(),
	formatoFin = 'DD/MM/YYYY',
	typeInterval = 'days',
} = {}) => {
	if (typeInterval == 'hours') {
		formatoInicio = 'h:mm';
		formatoFin = 'h:mm';
	} else if (typeInterval == 'daysAndHours') {
		formatoInicio = 'DD/MM/YYYY h:mm';
		formatoFin = 'DD/MM/YYYY h:mm';
		typeInterval = 'hours';
	}
	const fechaInicio = moment(fInicio, formatoInicio).toDate();
	const fechaFin = moment(fFin, formatoFin);
	return fechaFin.diff(fechaInicio, typeInterval);
};

export default {
	IntervaloTiempo,
};
