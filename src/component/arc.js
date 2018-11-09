import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

class Arc extends Component {
  constructor(props) {
    super(props);
  }

  polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(' ');

    return d;
  };

  render() {
    const {
      d,
      startAngle,
      endAngle,
      strokeWidth,
      strokeColor, 
      style
    } = this.props;

    return (
      <Svg
        height={d}
        width={d}
        style={style}
      >
        <Path
          d={this.describeArc(d/2, d/2, d/2 - strokeWidth, startAngle, endAngle)}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    );
  }
}

Arc.propTypes = {
  d: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  style: PropTypes.any
};

Arc.defaultProps = {
  strokeWidth: 20,
  strokeColor: 'rgba(0,0,0,0.2)'
};

export default Arc;
