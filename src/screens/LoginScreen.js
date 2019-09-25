import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemeContext } from 'react-navigation';
import { gStyle } from '../constants';

// components
import Touch from '../components/Touch';

export default class loginScreen extends Component {
  state = {
    username: '',
    password: '',
    showLoading: false
  };

  doLogin = () => {
    const { onFinish } = this.props;
    this.setState({
      showLoading: true
    });
    // do login operation here
    setTimeout(() => {
      this.setState({
        showLoading: false
      });
      onFinish();
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
