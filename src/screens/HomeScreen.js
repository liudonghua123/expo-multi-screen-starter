import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { gStyle } from '../constants';

// components
import Touch from '../components/Touch';

const HomeScreen = ({ navigation, screenProps }) => {
  const theme = useTheme();

  // a sample code on how to use imagepicker to select image
  // https://docs.expo.io/versions/latest/sdk/imagepicker/
  // https://daveceddia.com/intro-to-hooks/
  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // https://stackoverflow.com/questions/53945763/componentdidmount-equivalent-on-a-react-function-hooks-component
  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <View style={gStyle.container[theme]}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        <Text style={gStyle.text[theme]}>Home content area</Text>

        <View style={gStyle.spacer64} />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'grey'
          }}
        >
          <Button icon="camera" mode="contained" onPress={_pickImage}>
            Pick an image from camera roll
          </Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Auth', { source: 'App' })}
        >
          Jump to SignIn screen
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('MultiBase')}
        >
          Jump to Multi tab
        </Button>

        <Button mode="contained" onPress={() => screenProps.updateTheme(false)}>
          Light theme
        </Button>

        <Button mode="contained" onPress={() => screenProps.updateTheme(true)}>
          Dark theme
        </Button>
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Home'
};

HomeScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

export default HomeScreen;
