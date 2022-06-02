
export const validateQuotes = (rule, value) => {
	try {
		if (value.includes('"') || value.includes('\'')) {
			return Promise.reject(new Error('Ingresó un caracter no permitido'));
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateTel = (rule, value) => {
	try {
		const tel = /^[7|6|2]{1}[0-9]{7}$/;
		if (tel.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('El teléfono debe iniciar con 7, 6 o 2 y contener 8 dígitos'));
	} catch (error) {
		return Promise.resolve();
	}
};

// This only works for decimals greater than 0.01
export const validateDecimal = (rule, value) => {
	try {
		const regex = /^[0-9]*(\.\d{0,2})?$/;
		if (regex.test(value)) {
			if (Number(value) <= 0) {
				return Promise.reject(new Error(`La cantidad debe ser mayor a 0`));
			}
			return Promise.resolve();
		}
		return Promise.reject(new Error(`Se permiten 2 decimales`));
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateNumbers = (rule, value) => {
	try {
		const regex = /^[0-9]*$/;
		if (regex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo se premiten números'));
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateCharImage = (rule, value) => {
	try {
		if (value.includes('.')) {
			return Promise.reject(new Error('El nombre de la imagen no puede contener puntos'));
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateUpperCaseLetters = (rule, value) => {
	try {
		const text = /^[A-Za-z]+$/;
		if (text.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo letras permitidas'));
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateLetters = (rule, value) => {
	try {
		const text = /^[A-Za-z áéíóúñÁÉÍÓÚÑ]+$/;
		if (text.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo letras, espacios y tíldes permitidas'));
	} catch (error) {
		return Promise.resolve();
	}
};

export const validateEmail = (rule, value) => {
	try {
		const text = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
		if (text.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('No es un correo permiido'));
	} catch (error) {
		return Promise.resolve();
	}
};

export const charactersPermited = (rule, value) => {
	// valida que solo hayan caractres alphanumericos permitidos
	const permits = 'abcdefghijklmnñopqrstuvwxyzáéíóú 0123456789!#$%&+,.:=@^_|';
	// let message = null;
	try {
		if (value) {
			for (let i = 0; i < value.length; i += 1) {
				if (
					permits.toLowerCase().indexOf(value.toLowerCase().charAt(i), 0) === -1
				) {
					return Promise.reject(new Error('Ingresó un caracter no permitido'));
				}
			}
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.resolve();
	}
};

export const whitespace = (rule, value) => {
	// valida que solo hayan caractres alphanumericos permitidos
	const permits = ' ';
	try {
		if (value) {
			for (let i = 0; i < value.length; i += 1) {
				if (
					permits.toLowerCase().indexOf(value.toLowerCase().charAt(i), 0) !== -1
				) {
					return Promise.reject(new Error('No se admiten espacios'));
				}
			}
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.resolve();
	}
};

export const alphanumeric = (rule, value) => {
	if (value) {
		const numeros = '0123456789';
		const letras = 'abcdefghyjklmnñopqrstuvwxyz';
		const specialChart = '!#$%&+,.:=@^_|"';
		let containNumber = false;
		let containLowerCase = false;
		let containUpperCase = false;
		let containSpecial = false;
		let message;

		// valida que hayan números
		for (let i = 0; i < value.length; i += 1) {
			if (numeros.indexOf(value.charAt(i), 0) !== -1) {
				containNumber = true;
			}
		}

		// valida que hayan minusculas
		for (let i = 0; i < value.length; i += 1) {
			if (letras.toLowerCase().indexOf(value.charAt(i), 0) !== -1) {
				containLowerCase = true;
			}
		}

		// valida que hayan minusculas
		for (let i = 0; i < value.length; i += 1) {
			if (letras.toUpperCase().indexOf(value.charAt(i), 0) !== -1) {
				containUpperCase = true;
			}
		}

		// valida que hayan caracteres especiales
		for (let i = 0; i < value.length; i += 1) {
			if (specialChart.indexOf(value.charAt(i), 0) !== -1) {
				containSpecial = true;
			}
		}

		if (!containNumber || !containLowerCase || !containUpperCase || !containSpecial) {
			message = 'La contraseña debe contener ';
			if (!containNumber) {
				message = `${message} números`;
			}
			if (!containLowerCase) {
				if (containUpperCase && containSpecial && !containNumber) {
					message = `${message} y`;
				} else if (!containNumber) {
					message = `${message},`;
				}
				message = `${message} minúsculas`;
			}
			if (!containUpperCase) {
				if (containSpecial && (!containNumber || !containLowerCase)) {
					message = `${message} y`;
				} else {
					if (!containLowerCase || !containNumber) {
						message = `${message},`;
					}
					message = `${message} mayúsculas`;
				}
			}
			if (!containSpecial) {
				if (!containNumber || !containLowerCase || !containUpperCase) {
					message = `${message} y`;
				}
				message = `${message} caracteres especiales`;
			}
			return Promise.reject(new Error(message));
		}
		return Promise.resolve();
	}
	return Promise.resolve();
};
