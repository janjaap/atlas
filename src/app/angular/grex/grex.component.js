import ReactDOM from 'react-dom';
import angular from 'angular';

angular.module('dpAtlas')
    .component('dpGrex', {
        bindings: {
            data: '<'
        },
        template: require('./grex.html'), //eslint-disable-line
        controller: DpGrex,
        controllerAs: 'vm'
    });

DpGrex.$inject = ['$timeout', '$window'];

function DpGrex ($timeout, $window) {
    const vm = this;
    const GraphWrapper = $window.DetailGrondexploitatieGraphPhasedWrapper;
    const render = $window.render;
    let graphNode;

    const mountReactComponents = (data) => {
        graphNode = document.getElementById('detail-grondexploitatie-graph-phased');
        /* istanbul ignore next */
        if (graphNode) {
            render(React.createElement(GraphWrapper, { data: data }), graphNode);
        }
    };

    $timeout(() => {
        mountReactComponents(vm.data);
    });

    this.$onDestroy = () => {
        if (graphNode) {
            ReactDOM.unmountComponentAtNode(graphNode);
        }
    };
}
