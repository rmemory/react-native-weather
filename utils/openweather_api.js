/* eslint-disable no-underscore-dangle, no-restricted-globals */

/*
 * This file provides a basic interface to openweathermap
 */

const axios = require('axios');

const _baseURL = 'http://api.openweathermap.org/data/2.5/';
const _APIKEY = 'a561877e553311308de8d78303c76b39';


// Default data for queries
const baseQueryStringData = {
	type: 'accurate',
	APPID: _APIKEY,
	cnt: 5,
};

// Base functions

const callAxios = url => axios.get(url)
	.then(response => ({ data: response.data }));

const prepRouteParams = queryStringData => Object.keys(queryStringData).map(
	key => `${key}=${encodeURIComponent(queryStringData[key])}`,
).join('&');

const prepUrl = (type, queryStringData) => `${_baseURL}${type}?${prepRouteParams(queryStringData)}`;

// City string apis
const cityQueryStringData = city => Object.assign({ q: city }, baseQueryStringData);

const getCurrentWeatherByCity = (city) => {
	const queryStringData = cityQueryStringData(city);
	const url = prepUrl('weather', queryStringData);

	return callAxios(url);
};

const getForecastByCity = (city) => {
	const queryStringData = cityQueryStringData(city);
	const url = prepUrl('forecast', queryStringData);

	return callAxios(url);
};

// City ID apis
// TODO

export { getCurrentWeatherByCity };
export { getForecastByCity };
