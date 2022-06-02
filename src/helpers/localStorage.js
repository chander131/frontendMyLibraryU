export const setItem = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const getItem = async (key) => {
	const item = await window.localStorage.getItem(key);
	return item !== 'undefined' ? JSON.parse(item) : '';
};

export const removeItem = (key) => window.localStorage.removeItem(key);

export const clearStorage = () => window.localStorage.clear();
