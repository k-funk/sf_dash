import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class MainNav extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classNames(className, 'header')}>
        <a href="#/" aria-label="Home"><span className="fas fa-home" /></a>
        <a href="#/settings" aria-label="Settings"><span className="fas fa-cog" /></a>
      </div>

    );
  }
}
