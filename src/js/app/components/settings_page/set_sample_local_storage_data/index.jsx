import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import LocalStorage, { SAMPLE_DATA } from 'app/utils/local_storage';


export default class SetSampleLocalStorageData extends PureComponent {
  static propTypes = {
    className: T.string,
    localStorageKey: T.oneOf(Object.keys(SAMPLE_DATA)).isRequired,
  };

  static defaultProps = {
    className: '',
  }

  setSampleData = () => {
    const { localStorageKey } = this.props;
    LocalStorage.setSampleData(localStorageKey);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(className)}>
        <p>
          <Button color="primary" onClick={this.setSampleData}>
            Set Sample LocalStorage Data
          </Button>
        </p>
        <p className="small">Replace stored data with sample data.</p>
      </div>
    );
  }
}
