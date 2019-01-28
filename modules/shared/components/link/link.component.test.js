// This test is never run because the problems that dp-link gives.
// In the test configuration is the link.component.mock used
//    instead of link.component
describe('The dp-link component', function () {
    let $compile,
        $rootScope,
        store,
        mockedReducer,
        mockedActions,
        mockedPayload,
        mockedState,
        mockedStateUrlConverter,
        mockedTargetState,
        mockedTargetPath;

    beforeEach(function () {
        mockedActions = {
            ACTION_WITH_LINK: {
                id: 'ACTION_WITH_LINK',
                isButton: false
            },
            ACTION_WITH_BUTTON: {
                id: 'ACTION_WITH_BUTTON',
                isButton: true
            },
            ACTION_WITHOUT_BUTTON_CONFIG: {
                id: 'ACTION_WITHOUT_BUTTON_CONFIG'
            }
        };

        angular.mock.module(
            'dpShared',
            {
                $location: {
                    host: function () {
                        return 'localhost';
                    }
                },
                store: {
                    dispatch: angular.noop
                },
                applicationState: {
                    getReducer: () => {
                        return mockedReducer;
                    },
                    getStateUrlConverter: () => {
                        return mockedStateUrlConverter;
                    },
                    getStore: () => {
                        return {
                            getState: () => {
                                return mockedState;
                            }
                        };
                    }
                }
            },
            $provide => {
                $provide.constant('ACTIONS', mockedActions);
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        mockedPayload = {
            lalalala: true,
            numberOfLas: 4
        };

        mockedReducer = jasmine.createSpy('reducer');

        mockedStateUrlConverter = {
            state2params: angular.noop,
            params2state: angular.noop,
            state2url: () => {
                return mockedTargetPath;
            }
        };

        mockedTargetPath = '#this=something-else';

        spyOn(store, 'dispatch');

        spyOn(mockedStateUrlConverter, 'state2url').and.returnValue(mockedTargetPath);
    });

    function getComponent (className, hoverText, type, payload) {
        const element = document.createElement('dp-link');
        element.setAttribute('type', type);

        const scope = $rootScope.$new();

        if (angular.isDefined(payload)) {
            element.setAttribute('payload', 'payload');
            scope.payload = payload;
        }

        if (angular.isString(className)) {
            element.setAttribute('class-name', className);
        }

        if (angular.isString(hoverText)) {
            element.setAttribute('hover-text', hoverText);
        }

        element.innerText = 'Transcluded text';

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('depending on the specified type (ACTION) a button or link is shown', function () {
        let component;

        // When using ACTION_WITH_LINK
        component = getComponent(null, null, 'ACTION_WITH_LINK', mockedPayload);
        expect(component.find('a').length).toBe(1);
        expect(component.find('button').length).toBe(0);

        // When using ACTION_WITH_BUTTON
        component = getComponent(null, null, 'ACTION_WITH_BUTTON', mockedPayload);
        expect(component.find('button').length).toBe(1);
        expect(component.find('a').length).toBe(0);
    });

    it('shows a button when there is no isButton variabele present for this ACTION', function () {
        // When using ACTION_WITH_LINK
        const component = getComponent(null, null, 'ACTION_WITHOUT_BUTTON_CONFIG', mockedPayload);
        expect(component.find('a').length).toBe(1);
        expect(component.find('button').length).toBe(0);
    });

    it('can have a custom className', function () {
        let component;

        // A link with a custom class
        component = getComponent('my-special-class', null, 'ACTION_WITH_LINK', mockedPayload);
        expect(component.find('a').attr('class')).toContain('my-special-class');

        // A button with a custom class
        component = getComponent('my-special-class', null, 'ACTION_WITH_BUTTON', mockedPayload);
        expect(component.find('button').attr('class')).toContain('my-special-class');
    });

    it('has a default fallback class if no className is specified', function () {
        let component;

        // A link with the default class
        component = getComponent(null, null, 'ACTION_WITH_LINK', mockedPayload);
        expect(component.find('a').attr('class')).toContain('o-btn o-btn--link');

        // A button with the default class
        component = getComponent(null, null, 'ACTION_WITH_BUTTON', mockedPayload);
        expect(component.find('button').attr('class')).toContain('o-btn o-btn--link');
    });

    it('has an optional hover text (title attribute)', function () {
        let component;

        // A link with hover text
        component = getComponent(null, 'Look at me!', 'ACTION_WITH_LINK', mockedPayload);
        expect(component.find('a').attr('title')).toContain('Look at me!');

        // A button with hover text
        component = getComponent(null, 'Woohoo!', 'ACTION_WITH_BUTTON', mockedPayload);
        expect(component.find('button').attr('title')).toContain('Woohoo!');
    });

    it('clicking the button will trigger a call to store.dispatch', function () {
        let component;

        // A dispatch with a payload
        component = getComponent(null, null, 'ACTION_WITH_BUTTON', mockedPayload);
        component.find('button').click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: mockedActions.ACTION_WITH_BUTTON,
            payload: mockedPayload
        });

        // A dispatch without a payload
        store.dispatch.calls.reset();
        component = getComponent(null, null, 'ACTION_WITH_BUTTON');
        component.find('button').click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: mockedActions.ACTION_WITH_BUTTON
        });
    });

    it('sets the href attribute for actions with a link', function () {
        const component = getComponent(null, null, 'ACTION_WITH_LINK', mockedPayload);

        expect(component.find('a').attr('href')).toBe(mockedTargetPath);

        // The value for the href attribute is composed by several injected dependencies, making sure these are used
        expect(mockedReducer).toHaveBeenCalledWith(
            mockedState,
            {
                type: mockedActions.ACTION_WITH_LINK,
                payload: mockedPayload
            }
        );
        expect(mockedStateUrlConverter.state2url).toHaveBeenCalledWith(mockedTargetState);
    });

    it('transcludes content without adding whitespace', function () {
        let component;

        // A link with transcluded content
        component = getComponent(null, null, 'ACTION_WITH_LINK', mockedPayload);
        expect(component.find('a').text()).toBe('Transcluded text');

        // A button with transcluded content
        component = getComponent(null, null, 'ACTION_WITH_BUTTON', mockedPayload);
        expect(component.find('button').text()).toBe('Transcluded text');
    });
});
