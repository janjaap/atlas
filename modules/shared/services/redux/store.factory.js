(function () {
    angular
        .module('dpShared')
        .factory('store', storeFactory);

    storeFactory.$inject = ['$window'];

    function storeFactory ($window) {
        return $window.reduxStore;
    }
})();
