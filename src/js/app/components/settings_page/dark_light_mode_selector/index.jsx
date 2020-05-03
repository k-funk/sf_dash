import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button, ButtonGroup, Label } from 'reactstrap';
import classNames from 'classnames';

import LocalStorage, { HTML_CLASS_KEY } from 'app/utils/local_storage';


export const MODES = {
  DARK: 'dark-mode',
  LIGHT: 'light-mode',
};

export default class DarkLightModeSelector extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.setMode = this.setMode.bind(this);
  }

  setMode = mode => {
    document.documentElement.className = mode;
    LocalStorage.set(HTML_CLASS_KEY, mode);
    // this is because we aren't using state to determine if we are in dark mode
    this.forceUpdate();
  }

  isDarkModeSelected = () => (
    document.documentElement.className === MODES.DARK
  )

  render() {
    const { className } = this.props;

    const isDarkModeSelected = this.isDarkModeSelected();

    return (
      <>
        <Label className="mr-2">Theme:</Label>
        <ButtonGroup className={classNames(className)}>
          <Button
            onClick={() => this.setMode(MODES.DARK)}
            color={isDarkModeSelected ? 'primary' : 'secondary'}
          >
            Dark
          </Button>
          <Button
            onClick={() => this.setMode(MODES.LIGHT)}
            color={isDarkModeSelected ? 'secondary' : 'primary'}
          >
            Light
          </Button>
        </ButtonGroup>
      </>
    );
  }
}
