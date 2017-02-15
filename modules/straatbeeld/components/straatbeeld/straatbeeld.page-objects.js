'use strict';

const
    link = dp.require('modules/shared/components/link/link.page-objects'),
    toggleMap = dp.require('modules/straatbeeld/components/toggle-straatbeeld-fullscreen/' +
        'toggle-straatbeeld-fullscreen.page-objects'),
    metadata = dp.require('modules/straatbeeld/components/metadata/metadata.page-objects'),
    hotspot = dp.require('modules/straatbeeld/components/hotspot/hotspot.page-objects');

module.exports = function (straatbeeldElement) {
    return {
        element: straatbeeldElement,
        get close () {
            return link(straatbeeldElement.element(by.css('.qa-straatbeeld-close')));
        },
        get visible () {
            return dp.visible(straatbeeldElement);
        },
        get toggleMap () {
            return toggleMap(straatbeeldElement.element(by.css('dp-straatbeeld-fullscreen')));
        },
        get metadata () {
            return metadata(straatbeeldElement.element(by.css('dp-straatbeeld-metadata')));
        },
        hotspots: function (index) {
            return hotspot(straatbeeldElement.all(by.css('dp-hotspot')).get(index));
        }
    };
};
