import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import LocalStorage, { ALL_SETTINGS_KEYS } from 'app/utils/local_storage';


export default class DisplayLocalStorageData extends PureComponent {
  static propTypes = {
    className: T.string,
    localStorageKey: T.oneOf(ALL_SETTINGS_KEYS).isRequired,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  getLocalStorageData = key => (
    LocalStorage.get(key)
  )

  toggleShow = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { className, localStorageKey } = this.props;
    const { show } = this.state;
    const codeString = JSON.stringify(this.getLocalStorageData(localStorageKey));

    return (
      <div className={classNames(className)}>
        <p>
          <Button color="primary" onClick={this.toggleShow}>
            {!show ? 'Show' : 'Hide'} LocalStorage Data
          </Button>
        </p>
        <p className="small">JSON representation of the stored data.</p>
        {show && (
          <SyntaxHighlighter language="json" style={monokai} className="my-3">
            {codeString}
          </SyntaxHighlighter>
        )}
      </div>
    );
  }
}
