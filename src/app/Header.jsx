import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AngularWrapper from './angular-wrapper/AngularWrapper';

const mapStateToProps = (state) => ({
  user: state.user
});

const searchAction = {
  id: 'FETCH_SEARCH_RESULTS_BY_QUERY',
  ignore: true
};

const toggleMapFullscreen = () => (
  { type: 'TEST' });
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleFullscreen: toggleMapFullscreen
}, dispatch);

class HeaderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: true,
      isAngularAppActive: true
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
      <div className="c-dashboard__heading">
        {
          this.state.isAngularAppActive && (
            <AngularWrapper
              size={'short'}
              user={this.props.user}
              has-print-button
              search-action={searchAction}
              query={''}
              moduleName={'dpHeaderPanel'}
            >
              <dp-site-header
                size="size"
                user="user"
                has-print-button="hasPrintButton"
                has-embed-button="hasEmbedButton"
                search-action="searchAction"
                query="query"
              />
            </AngularWrapper>
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);
