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
      this.setState({});
      this.angularApp = angularApp;
    };

    this.setComponent = (component) => {
      this.angularComponent = component;
    };
  }

  componentDidMount() {
    angular.bootstrap(this.angularApp, ['dpAtlas', reactAngularModule(false).name]);
    setTimeout(() => {
      const test = this.angularApp.get('$rootScope');
      console.log(test);
      debugger;
      this.setState({ angularActive: true });
    }, 1000);
    console.log(test);
    debugger;
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
    // this.$rootScope.$destroy();
  }

  render() {
    return (
      <div
        ref={this.setAngularApp}
      >
        {
         this.state.angularActive === true && (
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
