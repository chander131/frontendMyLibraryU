import moment from 'moment';

const toTimestamp = (strDate) => {
	const datum = Date.parse(strDate);
	return datum / 1000;
};

export const toCalendarDate = (dateMiliseconds, format) => moment.unix(dateMiliseconds).format(format);

export const toMilisecondNowStart = () => {
	const actualdate = new Date();
	const start = new Date(actualdate.getFullYear(), actualdate.getMonth(), actualdate.getDate());
	return toTimestamp(start);
};

export const toMilisecondNowEnd = () => {
	const actualdate = new Date();
	const end = new Date(actualdate.getFullYear(), actualdate.getMonth(), actualdate.getDate(), 23, 59);
	return toTimestamp(end);
};

export const toMilisecondDate = (year, month, day, type = 'start') => {
	const date = new Date(year, month, day, (type !== 'start' && 23), (type !== 'start' && 59));
	return toTimestamp(date);
};

export const toMilisecondStrDate = (strDate, type = 'start') => {
	const dateArray = strDate.split('/');
	dateArray.forEach((item, i) => {
		dateArray[i] = Number.parseInt(item);
	});
	return toMilisecondDate(dateArray[0], dateArray[1] - 1, dateArray[2], type);
};

export const toMomentStart = (momentDate) => {
	const date = moment(momentDate).add().hours(0).minutes(0)
		.seconds(0);
	return toTimestamp(date._d);
};

export const toMomentEnd = (momentDate) => {
	const date = moment(momentDate).add().hours(23).minutes(59)
		.seconds(59);
	return toTimestamp(date._d);
};

export default toTimestamp;
