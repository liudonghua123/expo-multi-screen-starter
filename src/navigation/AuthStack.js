import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import SignInScreen from '../screens/SignInScreen';

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const AuthStack = createStackNavigator({
  Auth: SignInScreen
});

export default AuthStack;
