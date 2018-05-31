describe('The marzipanoService factory', function () {
    var $rootScope,
        $q,
        Marzipano,
        marzipanoService,
        hotspotService,
        fakeView,
        fakeCubeGeometery,
        fakeViewer,
        fakeHotspotContainer,
        fakeScene;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                hotspotService: {
                    createHotspotTemplate: function () {
                        var q = $q.defer();

                        q.resolve('FAKE_HOTSPOT_TEMPLATE');

                        return q.promise;
                    }
                }
            },
            function ($provide) {
                $provide.constant('STRAATBEELD_CONFIG', {
                    MAX_RESOLUTION: 1000,
                    MAX_FOV: 100,
                    CAMERA_HEIGHT: 1,
                    LEVEL_PROPERTIES_LIST: ['FAKE_LEVEL', 'PROPERTIES_LIST']
                });
            }
        );

        angular.mock.inject(
            function (_$rootScope_, _$q_, _Marzipano_, _marzipanoService_, _hotspotService_) {
                $rootScope = _$rootScope_;
                $q = _$q_;
                Marzipano = _Marzipano_;
                marzipanoService = _marzipanoService_;
                hotspotService = _hotspotService_;
            }
        );

        fakeView = {
            setYaw: function () {},
            setPitch: function () {},
            setFov: function () {}
        };

        fakeCubeGeometery = {
            whatever: 'some data'
        };

        fakeViewer = {
            createScene: function () {}
        };

        fakeHotspotContainer = {
            createHotspot: function () {}
        };

        fakeScene = {
            switchTo: function () {},
            hotspotContainer: function () {
                return fakeHotspotContainer;
            }
        };

        spyOn(Marzipano, 'Viewer').and.returnValue(fakeViewer);
        spyOn(Marzipano.RectilinearView.limit, 'traditional').and.returnValue('FAKE_VIEW_LIMITER');
        spyOn(Marzipano, 'RectilinearView').and.returnValue(fakeView);
        spyOn(Marzipano.ImageUrlSource, 'fromString').and.returnValue('FAKE_IMAGE_URL_SOURCE');
        spyOn(marzipanoService, 'loadScene').and.callThrough();
        spyOn(Marzipano, 'CubeGeometry').and.returnValue(fakeCubeGeometery);
        spyOn(fakeViewer, 'createScene').and.returnValue(fakeScene);
        spyOn(fakeView, 'setYaw');
        spyOn(fakeView, 'setPitch');
        spyOn(fakeView, 'setFov');
        spyOn(fakeScene, 'switchTo');
        spyOn(hotspotService, 'createHotspotTemplate').and.callThrough();
        spyOn(fakeHotspotContainer, 'createHotspot');
    });

    it('creates a Marzipano viewer instance when initializing', function () {
        var fakeDomElement,
            viewer;

        fakeDomElement = document.createElement('div');
        viewer = marzipanoService.initialize(fakeDomElement);

        expect(Marzipano.Viewer).toHaveBeenCalledWith(fakeDomElement, jasmine.anything());
        expect(viewer).toEqual(fakeViewer);
    });

    it('uses the extra settings to enable print in Firefox and Safari', function () {
        var fakeDomElement;

        fakeDomElement = document.createElement('div');
        marzipanoService.initialize(fakeDomElement);

        /*
        Make sure stageType is null (autodetect). Which will result in webgl when it's supported with a fallback to 2d
        for ADW.
        */
        expect(Marzipano.Viewer).toHaveBeenCalledWith(jasmine.anything(), jasmine.objectContaining({
            stageType: null
        }));

        // Don't clear the webgl buffer. Firefox and Safari clear this buffer by default when opening the print dialog
        expect(Marzipano.Viewer).toHaveBeenCalledWith(jasmine.anything(), jasmine.objectContaining({
            stage: {
                preserveDrawingBuffer: true
            }
        }));
    });

    describe('it has a loadScene function', function () {
        beforeEach(function () {
            var domElement = document.createElement('div');
            marzipanoService.initialize(domElement);
        });

        it('that, ehm, loads a scene', function () {
            marzipanoService.loadScene(
                {
                    pattern: 'http://api.example.com/path/{x}/{y}/{z}.jpg',
                    preview: 'http://api.example.com/path/preview.jpg'
                },
                179,
                1,
                2,
                []
            );

            expect(Marzipano.ImageUrlSource.fromString).toHaveBeenCalledWith(
                'http://api.example.com/path/{x}/{y}/{z}.jpg',
                {
                    cubeMapPreviewUrl: 'http://api.example.com/path/preview.jpg'
                }
            );
            expect(Marzipano.RectilinearView.limit.traditional).toHaveBeenCalledWith(1000, 1.7453292519943295);
            expect(Marzipano.RectilinearView).toHaveBeenCalledWith({}, 'FAKE_VIEW_LIMITER');
            expect(Marzipano.CubeGeometry).toHaveBeenCalledWith(['FAKE_LEVEL', 'PROPERTIES_LIST']);

            expect(fakeViewer.createScene).toHaveBeenCalledWith({
                source: 'FAKE_IMAGE_URL_SOURCE',
                geometry: fakeCubeGeometery,
                view: fakeView,
                pinFirstLevel: true
            });

            expect(fakeView.setYaw).toHaveBeenCalledWith(3.12413936106985);
            expect(fakeView.setPitch).toHaveBeenCalledWith(0.017453292519943295);
            expect(fakeView.setFov).toHaveBeenCalledWith(0.03490658503988659);
            expect(fakeScene.switchTo).toHaveBeenCalled();
        });

        it('which adds hotspots to the scene', function () {
            var mockedHotspots = [
                {
                    id: 'ABC',
                    distance: 5,
                    heading: 270,
                    year: 2016
                }, {
                    id: 'XYZ',
                    distance: 11,
                    heading: 80,
                    year: 2017
                }
            ];

            marzipanoService.loadScene('example.png', 179, 1, 2, mockedHotspots);

            expect(hotspotService.createHotspotTemplate).toHaveBeenCalledTimes(2);
            expect(hotspotService.createHotspotTemplate).toHaveBeenCalledWith('XYZ', 11, 0.09065988720074511, 2017);
            expect(hotspotService.createHotspotTemplate).toHaveBeenCalledWith('ABC', 5, 0.19739555984988078, 2016);

            $rootScope.$apply();

            expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledTimes(2);
            expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledWith(
                'FAKE_HOTSPOT_TEMPLATE',
                {
                    yaw: 1.3962634015954636,
                    pitch: 0.09065988720074511
                }
            );

            expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledWith(
                'FAKE_HOTSPOT_TEMPLATE',
                {
                    yaw: 1.3962634015954636,
                    pitch: 0.09065988720074511
                }
            );
        });
    });
});
