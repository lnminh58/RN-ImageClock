import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

const defaultClockFace = require('../../assets/img/clock.png');
const defaultHourHand = require('../../assets/img/hour-hand.png');
const defaultMinuteHand = require('../../assets/img/minute-hand.png');
const defaultSecondHand = require('../../assets/img/second-hand.png');

export default class ImageClock extends PureComponent {
  constructor(props) {
    super(props);
    const currentTime = new Date();
    this.state = {
      sec: (currentTime.getSeconds() * 6),
      min: (currentTime.getMinutes() + (currentTime.getSeconds() / 60)) * 6,
      hour:
        ((currentTime.getHours() % 12) + (currentTime.getMinutes() / 60)
        + (currentTime.getSeconds() / 3600)) * 30
    };
  }

  componentDidMount() {
    if (this.props.showRealTime) {
      this.timer = setInterval(() => {
        this.convertDateToDeg(new Date());
      }, this.props.updateTime);
    } else {
      this.convertDateToDeg(this.props.initialDate);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialDate !== this.props.initialDate) {
      this.convertDateToDeg(this.props.initialDate);
    }
  }

  componentWillUnmount() {
    if (this.props.showRealTime) {
      clearInterval(this.timer);
    }
  }

  convertDateToDeg = (d) => {
    this.setState({
      sec: this.props.smoothRotate
        ? (d.getSeconds() + (d.getMilliseconds() / 1000)) * 6
        : (d.getSeconds() * 6),
      min: (d.getMinutes() + (d.getSeconds() / 60)) * 6,
      hour:
        ((d.getHours() % 12) + (d.getMinutes() / 60) + (d.getSeconds() / 3600)) * 30
    });
  };

  clockFrame() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'relative',
      borderColor: 'black',
      borderWidth: this.props.clockBorderWidth,
      borderRadius: this.props.clockSize / 2
    };
  }

  clockHolder() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'absolute',
      right: -this.props.clockBorderWidth,
      bottom: -this.props.clockBorderWidth
    };
  }

  clockFace() {
    return {
      width: this.props.clockCentreSize,
      height: this.props.clockCentreSize,
      backgroundColor: this.props.clockCentreColor,
      borderRadius: this.props.clockCentreSize / 2,
      position: 'absolute',
      top: (this.props.clockSize - this.props.clockCentreSize) / 2,
      left: (this.props.clockSize - this.props.clockCentreSize) / 2
    };
  }

  hourHandStyles() {
    return {
      width: this.props.hourHandWidth,
      height: this.props.hourHandLength,
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginTop: -this.props.hourHandLength / 2,
      marginHorizontal: -this.props.hourHandWidth / 2
    };
  }

  minuteHandStyles() {
    return {
      width: this.props.minuteHandWidth,
      height: this.props.minuteHandLength,
      position: 'absolute',
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginTop: -(this.props.minuteHandLength / 2),
      marginHorizontal: -this.props.minuteHandWidth / 2
    };
  }

  secondHandStyles() {
    return {
      width: this.props.secondHandWidth,
      height: this.props.secondHandLength,
      position: 'absolute',
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginTop: -(this.props.secondHandLength / 2),
      marginHorizontal: -this.props.secondHandWidth / 2
    };
  }

  render() {
    console.log(this.state.hour)
    const {
      clockFace,
      hourHand,
      minuteHand,
      secondHand,
      minuteHandOffset,
      minuteHandLength,
      secondHandOffset,
      secondHandLength,
      hourHandOffset,
      hourHandLength,
      clockSize,
      clockBorderWidth,
      clockFaceColor,
      hourHandColor,
      minuteHandColor,
      secondHandColor,
    } = this.props;

    return (
      <View style={this.clockFrame()}>
        <Image
          style={{
            tintColor: clockFaceColor,
            width: clockSize - (clockBorderWidth * 2),
            height: clockSize - (clockBorderWidth * 2)
          }}
          resizeMode="stretch"
          source={clockFace}
        />
        <View style={this.clockHolder()}>
          <Image
            source={hourHand}
            resizeMode="center"
            style={[
              this.hourHandStyles(),
              {
                tintColor: hourHandColor,
                transform: [
                  { rotate: `${this.state.hour}deg` },
                  { translateY: -(hourHandOffset + (hourHandLength / 2)) }
                ]
              }
            ]}
          />

          <Image
            source={minuteHand}
            resizeMode="center"
            style={[
              this.minuteHandStyles(),
              {
                tintColor: minuteHandColor,
                transform: [
                  { rotate: `${this.state.min}deg` },
                  { translateY: -(minuteHandOffset + (minuteHandLength / 2)) }
                ]
              }
            ]}
          />

          <Image
            source={secondHand}
            resizeMode="center"
            style={[
              this.secondHandStyles(),
              {
                tintColor: secondHandColor,
                transform: [
                  { rotate: `${this.state.sec}deg` },
                  { translateY: -(secondHandOffset + (secondHandLength / 2)) }
                ]
              }
            ]}
          />

          <View style={this.clockFace()} />
        </View>
      </View>
    );
  }
}

ImageClock.propTypes = {
  clockFace: PropTypes.any,
  hourHand: PropTypes.any,
  minuteHand: PropTypes.any,
  secondHand: PropTypes.any,
  clockSize: PropTypes.number,
  clockBorderWidth: PropTypes.number,
  clockCentreSize: PropTypes.number,
  hourHandWidth: PropTypes.number,
  minuteHandWidth: PropTypes.number,
  secondHandWidth: PropTypes.number,
  hourHandLength: PropTypes.number,
  minuteHandLength: PropTypes.number,
  secondHandLength: PropTypes.number,
  hourHandOffset: PropTypes.number,
  minuteHandOffset: PropTypes.number,
  secondHandOffset: PropTypes.number,
  clockCentreColor: PropTypes.string,
  clockFaceColor: PropTypes.string,
  hourHandColor: PropTypes.string,
  minuteHandColor: PropTypes.string,
  secondHandColor: PropTypes.string,
  showRealTime: PropTypes.bool,
  initialDate: PropTypes.object,
  updateTime: PropTypes.number,
  smoothRotate: PropTypes.bool
};

ImageClock.defaultProps = {
  clockFace: defaultClockFace,
  hourHand: defaultHourHand,
  minuteHand: defaultMinuteHand,
  secondHand: defaultSecondHand,
  clockSize: 270,
  clockBorderWidth: 7,
  clockCentreSize: 15,
  hourHandWidth: 5.5,
  minuteHandWidth: 5,
  secondHandWidth: 2,
  hourHandLength: 70,
  minuteHandLength: 100,
  secondHandLength: 120,
  hourHandOffset: 0,
  minuteHandOffset: 0,
  secondHandOffset: 0,
  updateTime: 100,
  showRealTime: true,
  initialDate: new Date(),
  smoothRotate: false
};
