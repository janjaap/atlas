describe('The orientation factory', function () {
    var orientation,
        store,
        ACTIONS,
        mockedViewer;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () { }
                }
            }

        );

        angular.mock.inject(function (_orientation_, _store_, _ACTIONS_) {
            orientation = _orientation_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedViewer = {
            view: function () {
                return {
                    yaw: function () {
                        return 0.1;
                    },
                    pitch: function () {
                        return 0.2;
                    },
                    fov: function () {
                        return 0.3;
                    }
                };
            }
        };

        spyOn(store, 'dispatch');
    });

    it('dispatches an ACTION based on orientation from the Marzipano viewer', function () {
        orientation.update(mockedViewer);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SET_STRAATBEELD_ORIENTATION,
            payload: {
                heading: 5.729577951308232,
                pitch: 11.459155902616464,
                fov: 17.188733853924695
            }
        });
    });
});
