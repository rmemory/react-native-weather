/* eslint-disable react/jsx-indent, react/jsx-indent-props,
react/jsx-one-expression-per-line */
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	StatusBar,
} from 'react-native';

import SearchInput from './components/SearchInput';

import { getImage } from './utils/getImageForWeather';
// import { fetchLocationId, fetchWeather } from './utils/api.js';
import { getCurrentWeatherByCity } from './utils/openweather_api';
import { convertKelvinToFahrenheit } from './utils/helpers';

export default class App extends React.Component {
	state = {
		loading: false,
		error: false,
		location: '',
		temperature: 0,
		weather: '',
		panguitchWeather: '',
	}

	componentDidMount() {
		this.handleUpdateLocation('San Francisco');
	}

	handleUpdateLocation = async (city) => {
		if (!city) return;

		this.setState({ loading: true }, async () => {
			try {
				// const locationId = await fetchLocationId(city);
				// const { location, weather, temperature } = await fetchWeather(
				// 	locationId,
				// );
				let weather;

				const data = await getCurrentWeatherByCity(city);
				console.log(data);
				const location = data.data.name;
				weather = data.data.weather[0].icon;
				if (weather === '01d' || weather === '01n') {
					weather = 'Clear';
				} else if (weather === '02d' || weather === '02n'
							|| weather === '03d' || weather === '03n'
							|| weather === '04d' || weather === '04n') {
					weather = 'Light Cloud';
				} else if (weather === '09d' || weather === '09n'
							|| weather === '50d' || weather === '50n') {
					weather = 'Light Rain';
				} else if (weather === '10d' || weather === '10n') {
					weather = 'Heavy Rain';
				} else if (weather === '11d' || weather === '11n') {
					weather = 'Thunder';
				} else if (weather === '13d' || weather === '13n') {
					weather = 'Snow';
				}

				let panguitchWeather;

				if (location === 'Panguitch') {
					panguitchWeather = weather;
					weather = 'Panguitch';
				}

				const temperature = convertKelvinToFahrenheit(data.data.main.temp);

				this.setState({
					loading: false,
					error: false,
					location,
					weather,
					temperature,
					panguitchWeather,
				});
			} catch (e) {
				this.setState({
					loading: false,
					error: true,
				});
			}
		});
	}

	render() {
		const {
			loading, error, location, weather, temperature, panguitchWeather,
		} = this.state;

		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<StatusBar backgroundColor="blue" barStyle="light-content" />
				<ImageBackground
					source={getImage(weather)}
					style={styles.imageContainer}
					imageStyle={styles.image}
				>
					<View style={styles.detailsContainer}>
						<ActivityIndicator animating={loading} color="white" size="large" />

						{!loading && (
							<View>
								{error && (
									<Text style={[styles.smallText, styles.textStyle]}>
										Could not load weather, please try a different city.
									</Text>
								)}

								{!error && (
									<View>
										<Text style={[styles.largeText, styles.textStyle]}>
											{location}
										</Text>
										<Text style={[styles.smallText, styles.textStyle]}>
											{weather !== 'Panguitch' ? weather : panguitchWeather}
										</Text>
										<Text style={[styles.largeText, styles.textStyle]}>
											{`${Math.round(temperature)}°`}
										</Text>
									</View>
								)}

								<SearchInput
									placeholder="Search any city"
									onSubmit={this.handleUpdateLocation}
								/>
							</View>
						)}
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495E',
	},

	imageContainer: {
		flex: 1,
	},

	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},

	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 20,
	},

	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: 'white',
	},

	largeText: {
		fontSize: 44,
	},

	smallText: {
		fontSize: 18,
	},
});
