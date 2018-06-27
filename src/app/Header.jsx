import React from 'react';
import PropTypes from 'prop-types';
import AngularWrapper from './angular-wrapper/AngularWrapper';

class HeaderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: true,
      isAngularAppActive: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickHandler2 = this.onClickHandler2.bind(this);
  }

  onClickHandler() {
    this.setState({
      isPanelVisible: !this.state.isPanelVisible
    });
  }

  onClickHandler2() {
    this.setState({
      isAngularAppActive: !this.state.isAngularAppActive
    });
  }

  render() {
    return (
      <div>
        <button className="dp-link" onClick={this.onClickHandler2}>
          Toggle angular dp-panel
        </button>
        <button className="dp-link" onClick={this.onClickHandler}>
          Toggle isPanelVisible
        </button>
        {
          this.state.isAngularAppActive && (
            <AngularWrapper
              isPanelVisible={this.state.isPanelVisible}
              canClose
              moduleName={'dpHeaderPanel'}
            >
              <dp-panel is-panel-visible="isPanelVisible" can-close="canClose" />
            </AngularWrapper>
          )
        }
      </div>
    );
  }
}

export default HeaderWrapper;
