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
    showBusRemoval: T.bool,
    addForm: T.shape({
      toggleBusAddStopForm: T.func.isRequired,
    }).isRequired,
    toggleBusRemove: T.func.isRequired,
    predictions: T.array,
  };

  static defaultProps = {
    className: '',
    showBusRemoval: false,
    predictions: [],
  }

  render() {
    const { className, showBusRemoval, addForm, toggleBusRemove, predictions } = this.props;


    return (
      <div className={classNames(className)}>
        {!showBusRemoval && (
          <Button {...buttonProps} onClick={addForm.toggleBusAddStopForm}>
            <span className="fas fa-plus" />
          </Button>
        )}
        {!!predictions.length && (
          <Button {...buttonProps} onClick={toggleBusRemove}>
            <span className="fas fa-pen" />
          </Button>
        )}
      </div>
    );
  }
}
