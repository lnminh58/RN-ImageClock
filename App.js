/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Arc from './src/component/arc';
import ImageClock from './src/component/ImageClock';

const clockFace = require('./assets/img/clockBack.png');

const { width, height } = Dimensions.get('window');
const clockSize = width - 40;
const hourHandLength = clockSize / 4;
const minuteHandLength = clockSize / 2.65;
const secondHandLength = clockSize / 2.2;
const updateTime = 30;

const hourHandOffsetRatio = 9.85;
const minuteHandOffsetRatio = 11.7;
const secondHandOffsetRatio = 20;

const hourHandOffset = hourHandLength / hourHandOffsetRatio;
const minuteHandOffset = minuteHandLength / minuteHandOffsetRatio;
const secondHandOffset = secondHandLength / secondHandOffsetRatio;

const arcSize = secondHandLength * 2;

export default class App extends Component {
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      // startAngle: (d.getMinutes() + (d.getSeconds() / 60)) * 6
      startAngle: (d.getSeconds() + d.getMilliseconds() / 1000) * 6
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const d = new Date();
      this.setState({
        // startAngle: (d.getMinutes() + (d.getSeconds() / 60)) * 6
        startAngle: (d.getSeconds() + d.getMilliseconds() / 1000) * 6
      });
    }, updateTime);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageClock
          // clockFace={clockFace}
          hourHandLength={hourHandLength}
          minuteHandLength={minuteHandLength}
          secondHandLength={secondHandLength}
          minuteHandWidth={40}
          hourHandWidth={40}
          withBackground
          clockBorderWidth={0}
          clockSize={clockSize}
          hourHandOffset={-hourHandOffset}
          secondHandOffset={-secondHandOffset}
          minuteHandOffset={-minuteHandOffset}
          secondHandWidth={40}
          clockCentreSize={4}
          clockCentreColor="#27ae60"
          clockFaceColor="#3498db"
          secondHandColor="#27ae60"
          minuteHandColor="#27ae60"
          hourHandColor="#27ae60"
          updateTime={updateTime}
          smoothRotate
          // showRealTime={false}
          // initialDate={new Date()}
        />
          <Arc
            d={arcSize}
            startAngle={this.state.startAngle}
            endAngle={360}
            style={{
              position: 'absolute',
              top: height / 2 - arcSize / 2,
              left: width / 2 - arcSize / 2,
            }}
            strokeColor="rgba(255, 111, 0,0.6)"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
