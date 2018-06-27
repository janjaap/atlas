import React from 'react';
import PropTypes from 'prop-types';
import angular from 'angular';
import AngularTemplate, { reactAngularModule } from 'react-angular';

class AngularWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angularActive: false
    };
    this.setAngularApp = (angularApp) => {
      if (angularApp) {
        this.angularApp = angularApp;
        setTimeout(() => {
          this.setState({ angularActive: true });
        }, 100);
      }
    };

    this.setComponent = (component) => {
      if (component) {
        this.angularComponent = component;
        this.$rootScope = this.angularComponent.$scope.$root;
      }
    };
  }

  componentDidMount() {
    angular.bootstrap(this.angularApp, ['dpAtlas', reactAngularModule(false).name]);
    // this.$rootScope = test.get('$rootScope');
  }

  componentDidUpdate() {
    if (!this.angularComponent) {
      return;
    }
    Object.keys(this.props).forEach((key) => {
      if (key === 'children') {
        return;
      }
      this.angularComponent.$scope[key] = this.props[key];
    });
    this.angularComponent.$scope.$digest();
  }

  componentWillUnmount() {
    if (this.$rootScope) {
      this.setState({ angularActive: false });
      this.$rootScope.$destroy();
    }
  }

  render() {
    return (
      <div
        ref={this.setAngularApp}
      >
        {
         this.state.angularActive && (
           <AngularTemplate
             scope={{ ...this.props }}
             ref={this.setComponent}
           >
             { this.props.children }
           </AngularTemplate>
         )
        }
      </div>
    );
  }
}
AngularWrapper.propTypes = {
  children: PropTypes.element.isRequired
};

export default AngularWrapper;
