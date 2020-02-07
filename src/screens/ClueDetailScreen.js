import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { useTheme, ThemeContext } from 'react-navigation';
import { List } from 'react-native-paper';
import { Audio, Video } from 'expo-av';
import { ImageLoader } from 'react-native-image-fallback';
import { gStyle } from '../constants';
import config from '../../config';
import defaultImage from '../assets/splash.png';

class ClueDetailScreen extends Component {
  state = {
    item: {},
    itemfj: []
  };

  _isPlayings = {};

  _videos = {};

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

  _mountVideo = multiMediaSource => component => {
    if (component) {
      console.info(`this._videos ${this._videos}, ${this}`);
      this._videos[multiMediaSource] = component;
      console.info(
        `_mountVideo[${multiMediaSource}] ${multiMediaSource} ${component}`
      );
    }
  };

  togglePlay = multiMediaSource => e => {
    const { _videos, _isPlayings } = this;
    const player = _videos[multiMediaSource];
    const isPlaying = _isPlayings[player];
    console.info(`togglePlay[${multiMediaSource}] ${player} ${isPlaying}`);
    if (isPlaying) {
      player.pauseAsync();
    } else {
      player.playAsync();
    }
  };

  _onPlaybackStatusUpdate = multiMediaSource => status => {
    const { _videos } = this;
    const player = _videos[multiMediaSource];
    console.info(
      `_onPlaybackStatusUpdate[${multiMediaSource}] ${player} ${status.isPlaying}`
    );
    this._isPlayings[player] = status.isPlaying;
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
                        <TouchableOpacity
                          onPress={this.togglePlay(multiMediaSource)}
                        >
                          <Image
                            source={defaultImage}
                            style={{ width: 100, height: 100 }}
                          />
                          <Video
                            source={{ uri: multiMediaSource }}
                            ref={this._mountVideo(multiMediaSource)}
                            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate(
                              multiMediaSource
                            )}
                            audioOnly
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={false}
                            isLooping
                            style={{ width: 0, height: 0 }}
                          />
                        </TouchableOpacity>
                      );
                    } else if (item.wjfwxdlj.endsWith('.mp4')) {
                      multiMedia = (
                        <TouchableOpacity
                          onPress={this.togglePlay(multiMediaSource)}
                        >
                          <Video
                            source={{ uri: multiMediaSource }}
                            ref={this._mountVideo(multiMediaSource)}
                            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate(
                              multiMediaSource
                            )}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={false}
                            isLooping
                            style={{ width: 100, height: 100 }}
                          />
                        </TouchableOpacity>
                      );
                    } else {
                      multiMedia = (
                        <ImageLoader
                          source={multiMediaSource}
                          fallback={defaultImage}
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
