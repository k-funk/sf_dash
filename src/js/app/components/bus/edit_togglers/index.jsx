import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import LocalStorage from 'app/utils/local_storage';


const buttonProps = {
  className: 'mr-1',
  size: 'xs',
  color: 'secondary',
  outline: true,
};

export default class EditTogglers extends PureComponent {
  static propTypes = {
    className: T.string,
    showBusRemove: T.bool.isRequired,
    toggleShowBusRemove: T.func.isRequired,
    toggleAddStopForm: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      className,
      showBusRemove,
      toggleShowBusRemove,
      toggleAddStopForm,
    } = this.props;
    const routeStopTags = LocalStorage.getBusStopsFromLocalStorage();

    return (
      <div className={classNames(className, 'mb-2')}>
        {!showBusRemove && (
          <Button {...buttonProps} onClick={toggleAddStopForm}>
            <span className="fas fa-plus" />
          </Button>
        )}
        {!!routeStopTags.length && (
          <Button {...buttonProps} onClick={toggleShowBusRemove}>
            <span className="fas fa-pen" />
          </Button>
        )}
      </div>
    );
  }
}
