import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemeContext } from 'react-navigation';
// icons
// https://expo.github.io/vector-icons/
// https://react-native-training.github.io/react-native-elements/docs/button.html#title
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../constants';

// components
import Touch from '../components/Touch';

export default class SignInScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    // can not get params from navigation
    // https://github.com/react-navigation/react-navigation/issues/143
    const source = navigation.getParam('source', null);
    console.info(`navigation: ${JSON.stringify(navigation)}`);
    let options = {
      headerTitle: 'SignIn'
    };
    if (source === 'App') {
      options = {
        ...options,
        headerLeft: (
          <Button
            onPress={() => navigation.navigate('App')}
            type="clear"
            icon={<Ionicons name="ios-arrow-dropleft-circle" size={24} />}
          />
        )
      };
    }
    return options;
  };

  state = {
    username: '',
    password: '',
    showLoading: false
  };

  doLogin = async () => {
    const { navigation } = this.props;
    this.setState({
      showLoading: true
    });
    // do login operation here
    setTimeout(async () => {
      this.setState({
        showLoading: false
      });
      await AsyncStorage.setItem('userToken', 'abc');
      navigation.navigate('App');
    }, 1000);
  };

  render() {
    const { username, password, showLoading } = this.state;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={gStyle.container[theme]}>
            <ScrollView contentContainerStyle={gStyle.contentContainer}>
              <View style={gStyle.spacer64} />
              <Text style={gStyle.textHeader[theme]}>Login</Text>

              <Input
                containerStyle={{ marginVertical: 10 }}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                placeholder="Enter username"
                onChangeText={username => this.setState({ username })}
                value={username}
              />

              <Input
                containerStyle={{ marginVertical: 10 }}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                placeholder="Enter password"
                onChangeText={password => this.setState({ password })}
                value={password}
              />

              <Button
                title="LOG IN"
                onPress={this.doLogin}
                loading={showLoading}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  height: 50,
                  width: 320,
                  borderRadius: 30
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{
                  fontWeight: 'bold',
                  color: 'white'
                }}
              />
            </ScrollView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

SignInScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};
