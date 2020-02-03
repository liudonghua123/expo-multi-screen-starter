import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import ClueScreen from '../screens/ClueScreen';
import ClueDetailScreen from '../screens/ClueDetailScreen';

// icons
import SvgStats from '../components/icons/Svg.Stats';

const clueTabBarIcon = ({ focused }) => <SvgStats active={focused} />;
clueTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Clue Stack
// /////////////////////////////////////////////////////////////////////////////
const ClueStack = createStackNavigator(
  {
    Clue: ClueScreen,
    ClueDetail: ClueDetailScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Clue',
      tabBarIcon: clueTabBarIcon
    }
  }
);

export default ClueStack;
