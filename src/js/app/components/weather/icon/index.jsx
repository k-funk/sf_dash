import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


// July 2019: DarkSky's icon mapping is pretty dumb right now:
// "The only case where a daily icon will show a *-night value is partly-cloudy-night"

const DARK_SKY_ICON_MAP = {
  'clear-day': 'clear',
  'clear-night': 'clear',
  cloudy: 'cloudy',
  fog: 'fog',
  'partly-cloudy-day': 'partlycloudy',
  'partly-cloudy-night': 'partlycloudy',
  rain: 'rain',
  sleet: 'sleet',
  snow: 'snow',
  wind: 'wind',
};

export const getIcon = iconName => (
  `./images/weather-icons/${DARK_SKY_ICON_MAP[iconName] || 'unknown'}.svg`
);


export default class WeatherIcon extends PureComponent {
  static propTypes = {
    className: T.string,
    icon: T.string,
  };

  static defaultProps = {
    className: '',
    icon: '',
  }

  render() {
    const { className, icon } = this.props;

    if (!icon) { return null; }

    return (
      <img className={classNames(className)} src={getIcon(icon)} alt="" />
    );
  }
}
