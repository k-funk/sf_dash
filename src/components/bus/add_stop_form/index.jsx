import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';

import ManualAdd from './manual_add';
import GeolocateAdd from './geolocate_add';


export default class AddStopForm extends PureComponent {
  static propTypes = {
    className: T.string,
    addForm: T.shape({
      toggleBusAddStopForm: T.func.isRequired,
      validate: T.func.isRequired,
      getNearbyStops: T.func.isRequired,
      addStop: T.func.isRequired,
    }).isRequired,
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
    const { activeTab } = this.state;
    const { className, addForm } = this.props;

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
          <button type="button" className="btn close-form" onClick={addForm.toggleBusAddStopForm}>
            <span className="fas fa-times" />
          </button>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <GeolocateAdd addForm={addForm} />
          </TabPane>
          <TabPane tabId="2">
            <ManualAdd addForm={addForm} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
