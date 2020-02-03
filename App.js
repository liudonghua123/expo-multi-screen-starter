import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';
import { Appearance } from 'react-native-appearance';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { device, func, gStyle } from './src/constants';

// tab navigator
import RootNavigator from './src/navigation/RootNavigator';

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      theme,
      isLogined: false
    };
    // is iPad?
    if (device.isPad) {
      ScreenOrientation.allowAsync(
        ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
      );
    }
  }

  componentDidMount() {
    // get system preference
    const colorScheme = Appearance.getColorScheme();
    // if light or dark
    if (colorScheme !== 'no-preference') {
      this.setState({
        theme: colorScheme
      });
    }
  }

  updateTheme = isDark => {
    console.info(`updateTheme, isDark: ${isDark}`);
    const { theme } = this.state;
    this.setState({
      theme: {
        ...theme,
        dark: isDark
      }
    });
  };

  render() {
    const { isLoading, theme, isLogined } = this.state;
    const iOSStatusType = theme.dark ? 'dark-content' : 'light-content';
    // console.info(`app render`);
    if (isLoading) {
      console.info(`isLoading: ${isLoading}, showing <AppLoading />`);
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }
    console.info(`isLoading: ${isLoading}, showing <Main />`);
    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle={device.iOS ? iOSStatusType : 'light-content'} />
        <RootNavigator
          screenProps={{
            updateTheme: this.updateTheme
          }}
          theme={theme.dark ? 'dark' : 'light'}
        />
      </PaperProvider>
    );
  }
}

export default App;
