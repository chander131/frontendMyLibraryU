import { basePath, apiVersion } from './config';

export function getCoursesApi() {
	const url = `${basePath}/${apiVersion}/get-courses`;

	return fetch(url)
		.then((response) => response.json())
		.then((result) => result)
		.catch((err) => err);
}

export function getCourseDataUdemyApi(id) {
	const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
	const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
	const url = baseUrl + coursesParams;
	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Basic ' +
				window.btoa(
					// eslint-disable-next-line max-len
					'A5MsbimD1Tbp9rlEaPNTuyqUrQlEvFxMA3ICFkqC:FOSxQ3hSFo6ymMZ3FSVR0ucBevBGjCcKcrXNMGFZyWCHJqgGYDEH7Ybrs2cintaPXKFIEBe7EQ1oorMWBx62Ja1gPPIfeAOHBXZSi2OqaUB69mXIiRv5AN6f4JniqvPR'
				),
		},
	};

	return fetch(url, params)
		.then(async (response) => {
			return { code: response.status, data: await response.json() };
		})
		.then((result) => result)
		.catch((err) => err);
}

export function deleteCourseApi(token, id) {
	const url = `${basePath}/${apiVersion}/delete-course/${id}`;

	const params = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};

	return fetch(url, params)
		.then((response) => response.json())
		.then((result) => result)
		.catch((err) => err);
}

export function addCourseApi(token, course) {
	const url = `${basePath}/${apiVersion}/add-course`;

	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(course),
	};

	return fetch(url, params)
		.then((response) => response.json())
		.then((result) => result)
		.catch((err) => err);
}

export function updateCourseApi(token, id, data) {
	const url = `${basePath}/${apiVersion}/update-course/${id}`;

	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(data),
	};

	return fetch(url, params)
		.then((response) => response.json())
		.then((result) => result)
		.catch((err) => err);
}
