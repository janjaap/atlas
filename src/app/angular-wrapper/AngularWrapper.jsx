import React from 'react';
import PropTypes from 'prop-types';
import angular from 'angular';
import AngularTemplate, { reactAngularModule, ensureScopeAvailable } from 'react-angular';

const templates = require.context('../../../modules', true, /\.html$/);

class AngularWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angularActive: false
    };
    this.setAngularApp = (angularApp) => {
      if (angularApp) {
        this.angularApp = angularApp;
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
    angular.module(`${this.props.moduleName}`, ['dpHeader', reactAngularModule(false).name])
      .directive('exposeScope', () => ensureScopeAvailable())
      .run(($templateCache, reactAngularProductionReady) => {
        templates.keys().forEach((key) => {
          // Remove the dot from './dir/template.html' and prepend with
          // 'modules' to get 'modules/dir/template.html'.
          const templateId = `modules${key.substr(1)}`;
          $templateCache.put(templateId, templates(key));
        });
        reactAngularProductionReady();
        setTimeout(() => {
          this.setState({ angularActive: true });
        });
      });
    angular.bootstrap(this.angularApp, [this.props.moduleName]);
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

AngularWrapper.defaultProps = {
  angularJsAppId: 'DpAngularWrapper'
};
AngularWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  moduleName: PropTypes.string
};

export default AngularWrapper;
