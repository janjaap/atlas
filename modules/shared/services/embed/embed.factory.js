(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('embed', EmbedFactory);

    EmbedFactory.$inject = ['stateUrlConverter', '$location'];

    function EmbedFactory (stateUrlConverter, $location) {
        return {
            getLink: getLink,
            getHtml: getHtml
        };

        function getLink (state) {
            const port = Number($location.port());
            const baseUrl = port === 80 || port === 443
                ? `${$location.protocol()}://${$location.host()}`
                : `${$location.protocol()}://${$location.host()}:${port}`;
            return `${baseUrl}/${stateUrlConverter.state2url(state)}`;
        }

        function getHtml (state) {
            const url = getLink(state);
            return `<iframe width="500" height="400" src="${url}" frameborder="0"></iframe>`;
        }
    }
})();
