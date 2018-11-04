import mockedContentJson from './catalog.component.test.content';

describe('The catalog component', function () {
    'use strict';

    let $rootScope,
        $compile,
        $window,
        store,
        origSessionStorage;

    const mockedStore = {
        getState: angular.noop
    };

    const mockedContent =
        mockedContentJson['dcat:dataset'].map(item => {
            return {
                ...item,
                _links: {
                    self: 'endpoint'
                }
            };
        })
        ;

    const mockedOptionLabelFilter = () => 'label';

    beforeEach(function () {
        angular.mock.module('dpDataSelection', {
            store: mockedStore
        },
            function ($provide) {
                $provide.value('optionLabelFilter', mockedOptionLabelFilter);
            }
        );

        angular.mock.inject(function (_$rootScope_, _$compile_, _$window_, _store_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $window = _$window_;
            store = _store_;
        });

        origSessionStorage = $window.sessionStorage;
        $window.sessionStorage = {
            setItem: angular.noop
        };

        spyOn($window.sessionStorage, 'setItem');
    });

    afterEach(() => {
        $window.sessionStorage = origSessionStorage;
    });

    function getComponent (filterFormatter) {
        const element = document.createElement('dp-data-selection-catalog');
        element.setAttribute('content', 'content');

        const scope = $rootScope.$new();
        scope.content = mockedContent;

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('can load a detail page for a catalog', function () {
        spyOn(store, 'getState').and.returnValue({
            catalogFilters: {
                formatTypes: [{}],
                serviceTypes: [{}],
                distributionTypes: [{}]
            }
        });

        const component = getComponent();

        component.find('.qa-catalog-fetch-detail')[0].click();

        expect($window.sessionStorage.setItem)
            .toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL', jasmine.any(String));
    });
});
