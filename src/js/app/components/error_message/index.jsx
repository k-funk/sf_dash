import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class ErrorMessage extends PureComponent {
  static propTypes = {
    className: T.string,
    children: T.node,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, children } = this.props;

    if (!children) { return null; }

    return (
      <div className={classNames(className, 'error-message')}>
        <span className="fas fa-exclamation-circle mr-1" />
        <span>
          {children}
        </span>
      </div>
    );
  }
}
