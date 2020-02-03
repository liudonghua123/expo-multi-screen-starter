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
import { Audio, Video } from 'expo-av';
import { gStyle } from '../constants';
import config from '../../config';
import defaultImage from '../assets/splash.png';

class ClueDetailScreen extends Component {
  state = {
    item: {},
    itemfj: []
  };

  loadData = async () => {
    // 获取数据
    const itemUrl = `${config.server}/asjyj/findOneVQbSwxszbStr.do`;
    let response = await fetch(itemUrl);
    response = await response.json();
    console.info(`itemUrl response: ${JSON.stringify(response)}`);
    this.setState({ item: response.obj.xx });
    const itemfjUrl = `${config.server}/asjyj/findVQbSwxszbfjStr.do`;
    response = await fetch(itemfjUrl);
    response = await response.json();
    console.info(`itemfjUrl response: ${JSON.stringify(response)}`);
    this.setState({ itemfj: response.obj });
  };

  async componentDidMount() {
    await this.loadData();
  }

  _mountVideo = component => {
    this._video = component;
    // this._video.pauseAsync();
  };

  render() {
    const { item: itemDetail, itemfj } = this.state;
    const { navigation } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ScrollView
            contentContainerStyle={gStyle.contentContainer}
            style={gStyle.container[theme]}
          >
            <Text style={gStyle.text[theme]}>
              {`线索标题 ${itemDetail.xsbt}`}
            </Text>
            <Text style={gStyle.text[theme]}>
              {`线索详情 ${itemDetail.xsxq}`}
            </Text>
            <List.Section style={{ alignSelf: 'stretch' }}>
              <List.Subheader>线索附件信息</List.Subheader>
              {itemfj.map((item, index) => (
                <List.Item
                  title={item.fjmc}
                  description={item.xsbt}
                  left={props => {
                    const multiMediaSource = `${config.server}${item.wjfwxdlj}`;
                    console.info(`load multiMediaSource ${multiMediaSource}`);
                    let multiMedia = null;
                    if (item.wjfwxdlj.endsWith('.mp3')) {
                      multiMedia = (
                        <Text style={{ width: 100, height: 100 }}>
                          Audio Todo
                        </Text>
                      );
                    } else if (item.wjfwxdlj.endsWith('.mp4')) {
                      multiMedia = (
                        <Video
                          ref={this._mountVideo}
                          source={{ uri: multiMediaSource }}
                          rate={1.0}
                          volume={1.0}
                          isMuted={false}
                          resizeMode="cover"
                          shouldPlay
                          isLooping
                          style={{ width: 100, height: 100 }}
                        />
                      );
                    } else {
                      multiMedia = (
                        <Image
                          source={multiMediaSource}
                          style={{ width: 100, height: 100 }}
                        />
                      );
                    }
                    return multiMedia;
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

ClueDetailScreen.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'ClueDetail'
};

export default ClueDetailScreen;
