import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { useTheme, ThemeContext } from 'react-navigation';
import { List } from 'react-native-paper';
import { gStyle } from '../constants';
import config from '../../config';
import defaultImage from '../assets/splash.png';

class ClueScreen extends Component {
  state = {
    items: []
  };

  loadData = async () => {
    // 获取数据
    const itemsUrl = `${config.server}/asjyj/findPageQbSwxszbsStr.do`;
    console.info(`config: ${config}, itemsUrl: ${itemsUrl}`);
    let response = await fetch(itemsUrl);
    response = await response.json();
    console.info(`response: ${JSON.stringify(response)}`);
    this.setState({ items: response.aaData });
  };

  async componentDidMount() {
    await this.loadData();
  }

  render() {
    const { items } = this.state;
    const { navigation } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ScrollView
            contentContainerStyle={gStyle.contentContainer}
            style={gStyle.container[theme]}
          >
            <Text style={gStyle.text[theme]}>线索列表</Text>
            <List.Section style={{ alignSelf: 'stretch' }}>
              <List.Subheader></List.Subheader>
              {items.map((item, index) => (
                <List.Item
                  title={item.xsbt}
                  description={item.xsxq}
                  onPress={() => navigation.navigate('ClueDetail')}
                  left={props => {
                    const imageSource = item.swxsfmt
                      ? `${config.server}${item.swxsfmt}`
                      : defaultImage;
                    console.info(`load image ${imageSource}`);
                    return (
                      <Image
                        source={imageSource}
                        style={{ width: 50, height: 50 }}
                      />
                    );
                  }}
                />
              ))}
            </List.Section>
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  postItem: {
    flex: 1,
    margin: 10
  },
  title: {
    fontSize: 24
  },
  body: {
    fontSize: 18,
    color: 'grey'
  }
});

ClueScreen.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Clue'
};

export default ClueScreen;
