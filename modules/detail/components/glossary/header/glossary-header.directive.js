(function () {
    'use strict';

    angular
        .module('dpDetail')
        .directive('dpGlossaryHeader', dpGlossaryHeaderDirective);

    function dpGlossaryHeaderDirective () {
        return {
            restrict: 'E',
            scope: {
                heading: '@',
                definition: '@',
                isEmphasized: '<',
                usePlural: '=',
                metaData: '=',
                brk: '='
            },
            templateUrl: 'modules/detail/components/glossary/header/glossary-header.html',
            transclude: true,
            controller: DpGlossaryHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    DpGlossaryHeaderController.$inject = ['$scope', '$sce', 'GLOSSARY'];

    function DpGlossaryHeaderController ($scope, $sce, GLOSSARY) {
        const vm = this;

        vm.isVisible = {
            help: false,
            meta: false
        };

        $scope.$watch('vm.heading', function (heading) {
            vm.htmlHeading = $sce.trustAsHtml(heading);
        });

        vm.glossaryLabel = vm.usePlural
            ? GLOSSARY.DEFINITIONS[vm.definition].label_plural
            : GLOSSARY.DEFINITIONS[vm.definition].label_singular;
        vm.glossaryDescription = $sce.trustAsHtml(GLOSSARY.DEFINITIONS[vm.definition].description);
        vm.stelselpediaUrl = GLOSSARY.DEFINITIONS[vm.definition].url;

        vm.hasHelp = !!vm.glossaryDescription;
        vm.hasMetaData = angular.isDefined(vm.metaData);
        vm.hasButton = vm.hasHelp || vm.hasMetaData;

        vm.helpTitle = 'Uitleg tonen';
        vm.metaDataTitle = 'Informatie (metadata) tonen';

        vm.toggle = function (item) {
            vm.isVisible[item] = !vm.isVisible[item];

            if (item === 'help') {
                if (vm.isVisible[item]) {
                    vm.helpTitle = 'Uitleg verbergen';
                } else {
                    vm.helpTitle = 'Uitleg tonen';
                }
            }
            if (item === 'meta') {
                if (vm.isVisible[item]) {
                    vm.metaDataTitle = 'Informatie (metadata) verbergen';
                } else {
                    vm.metaDataTitle = 'Informatie (metadata) tonen';
                }
            }
        };
    }
})();
