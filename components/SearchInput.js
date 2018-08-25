import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, 
		 TextInput, 
		 View,
		 } from 'react-native';

export default class App extends React.Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
	};
	
	static defaultProps = {
		placeholder: '',
	};

	state = {
		location: '',
	}

	handleChangeText = (newLocation) => {
		this.setState({
			location: newLocation,
		});
	}

	handleSubmitEditing = () => {
		const { onSubmit } = this.props;
		const { location } = this.state;

		if (!location)
			return;
		
		onSubmit(location);
		this.setState({
			location: '',
		});
	}

	render() {
		const { placeholder } = this.props;
		const { location } = this.state;

		return (
			<View style={styles.container}>
				<TextInput
					autoCorrect={false}
					value={location}
					placeholder={placeholder}
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
					style={styles.textInput}
					clearButtonMode='always'
					onChangeText={this.handleChangeText}
					onSubmitEditing={this.handleSubmitEditing}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		marginTop: 20,
		backgroundColor: '#666',
		marginHorizontal: 40,
		paddingHorizontal: 10,
		borderRadius: 5,
	},

	textInput: {
		flex: 1,
		color: 'white',
	}
});
