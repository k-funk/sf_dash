import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button } from 'reactstrap';
import classNames from 'classnames';


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
    predictions: T.array,
    toggleAddStopForm: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
    predictions: [],
  }

  render() {
    const {
      className,
      showBusRemove,
      toggleShowBusRemove,
      predictions,
      toggleAddStopForm,
    } = this.props;

    return (
      <div className={classNames(className)}>
        {!showBusRemove && (
          <Button {...buttonProps} onClick={toggleAddStopForm}>
            <span className="fas fa-plus" />
          </Button>
        )}
        {!!predictions.length && (
          <Button {...buttonProps} onClick={toggleShowBusRemove}>
            <span className="fas fa-pen" />
          </Button>
        )}
      </div>
    );
  }
}
