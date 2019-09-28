import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button
} from 'react-native';
import { useTheme, ThemeContext } from 'react-navigation';
import { gStyle } from '../constants';

class StatsScreen extends Component {
  state = {
    posts: []
  };

  loadData = async () => {
    // 获取数据
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    response = await response.json();
    console.info(`response: ${JSON.stringify(response)}`);
    this.setState({ posts: response });
  };

  async componentDidMount() {
    await this.loadData();
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ScrollView
            contentContainerStyle={gStyle.contentContainer}
            style={gStyle.container[theme]}
          >
            <Button
              title="Refresh"
              onPress={async () => {
                console.info(`Refresh data`);
                await this.loadData();
              }}
            />
            <Text style={gStyle.text[theme]}>Posts</Text>
            <FlatList
              data={this.state.posts}
              renderItem={({ item }) => (
                <View style={styles.postItem} key={item.title}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.body}>{item.body}</Text>
                </View>
              )}
            />
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

StatsScreen.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Stats'
};

export default StatsScreen;
