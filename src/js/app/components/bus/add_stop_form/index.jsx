import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';

import ManualAdd from './manual_add';
import GeolocateAdd from './geolocate_add';


export default class AddStopForm extends PureComponent {
  static propTypes = {
    className: T.string,
    toggleAddStopForm: T.func.isRequired,
    onAddOrRemoveStop: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { className, toggleAddStopForm, onAddOrRemoveStop } = this.props;
    const { activeTab } = this.state;

    return (
      <div className={classNames(className, 'add-form', 'mb-2')}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames('clickable', { active: activeTab === '1' })}
              onClick={() => this.toggle('1')}
            >
              Geolocation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames('clickable', { active: activeTab === '2' })}
              onClick={() => this.toggle('2')}
            >
              Manual Input
            </NavLink>
          </NavItem>
          <button type="button" className="btn close-form" onClick={toggleAddStopForm}>
            <span className="fas fa-times" />
          </button>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <GeolocateAdd onAddOrRemoveStop={onAddOrRemoveStop} />
          </TabPane>
          <TabPane tabId="2">
            <ManualAdd onAddOrRemoveStop={onAddOrRemoveStop} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
