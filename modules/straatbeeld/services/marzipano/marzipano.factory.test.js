describe('The marzipanoService factory', function () {
    var $rootScope,
        $q,
        Marzipano,
        marzipanoService,
        straatbeeldApi,
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
                straatbeeldConfig: {
                    MAX_RESOLUTION: 1000,
                    MAX_FOV: 100,
                    RESOLUTION_LEVELS: 'FAKE_RESOLUTION_LEVELS',
                    HOTSPOT_PERSPECTIVE: 'FAKE_HOTSPOT_PERSPECTIVE'
                },
                angleConversion: {
                    degreesToRadians: function (input) {
                        return input;
                    }
                },
                straatbeeldApi: {
                    getImageSourceUrl: function (sceneId) {
                        return 'http://www.image-source-url.com/' + sceneId;
                    }
                },
                hotspotService: {
                    createHotspotTemplate: function () {
                        var q = $q.defer();

                        q.resolve('FAKE_HOTSPOT_TEMPLATE');

                        return q.promise;
                    },
                    calculateHotspotPosition: function () {
                        return 'FAKE_HOTSPOT_POSITION';
                    }
                }
            }
        );

        angular.mock.inject(
            function (_$rootScope_, _$q_, _Marzipano_, _marzipanoService_, _straatbeeldApi_, _hotspotService_) {
                $rootScope = _$rootScope_;
                $q = _$q_;
                Marzipano = _Marzipano_;
                marzipanoService = _marzipanoService_;
                straatbeeldApi = _straatbeeldApi_;
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
        spyOn(Marzipano, 'EquirectGeometry').and.returnValue(fakeCubeGeometery);
        spyOn(fakeViewer, 'createScene').and.returnValue(fakeScene);
        spyOn(fakeView, 'setYaw');
        spyOn(fakeView, 'setPitch');
        spyOn(fakeView, 'setFov');
        spyOn(fakeScene, 'switchTo');
        spyOn(hotspotService, 'createHotspotTemplate').and.callThrough();
        spyOn(hotspotService, 'calculateHotspotPosition').and.callThrough();
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

        //Don't clear the webgl buffer. Firefox and Safari clear this buffer by default when opening the print dialog
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

        fit('that, ehm, loads a scene', function () {

            marzipanoService.loadScene('example.png',179,1,2, []);

            expect(Marzipano.RectilinearView.limit.traditional).toHaveBeenCalledWith(1000, 100);
            expect(Marzipano.RectilinearView).toHaveBeenCalledWith({}, 'FAKE_VIEW_LIMITER');
            expect(Marzipano.EquirectGeometry).toHaveBeenCalledWith([{ width: 8000 }]);

            expect(fakeViewer.createScene).toHaveBeenCalledWith({
                source: 'FAKE_IMAGE_URL_SOURCE',
                geometry: fakeCubeGeometery,
                view: fakeView,
                pinFirstLevel: true
            });

 
            expect(fakeView.setYaw).toHaveBeenCalledWith(179);
            expect(fakeView.setPitch).toHaveBeenCalledWith(1);
            expect(fakeView.setFov).toHaveBeenCalledWith(2);
            expect(fakeScene.switchTo).toHaveBeenCalled();


        });

        fit('which adds hotspots to the scene', function () {
            var mockedHotspots = [
                {
                    id: 1,
                    distance: 100,
                    heading: 270,
                    pitch: 0.2
                }, {
                    id: 2,
                    distance: 80,
                    heading:79,
                    pitch: 0.15
                }
            ];

            marzipanoService.loadScene('example.png',179,1,2, mockedHotspots);

            expect(hotspotService.createHotspotTemplate).toHaveBeenCalledTimes(2);

            expect(hotspotService.createHotspotTemplate).toHaveBeenCalledWith(1, 100);
            // expect(hotspotService.createHotspotTemplate).toHaveBeenCalledWith(2, 80);

            // $rootScope.$apply();

            // expect(hotspotService.calculateHotspotPosition).toHaveBeenCalledTimes(2);
            // expect(hotspotService.calculateHotspotPosition).toHaveBeenCalledWith(mockedCar, mockedHotspots[0]);
            // expect(hotspotService.calculateHotspotPosition).toHaveBeenCalledWith(mockedCar, mockedHotspots[1]);

            // expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledTimes(2);
            // expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledWith(
            //     'FAKE_HOTSPOT_TEMPLATE',
            //     'FAKE_HOTSPOT_POSITION',
            //     'FAKE_HOTSPOT_PERSPECTIVE'
            // );
        });
    });
});
