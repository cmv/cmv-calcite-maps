(function () {
    var path = location.pathname.replace(/[^\/]+$/, '');
    window.dojoConfig = {
        locale: 'en-us',
        async: true,
        packages: [{
            name: 'viewer',
            location: 'https://cdn.rawgit.com/cmv/cmv-app/develop/viewer/js/viewer'
        }, {
            name: 'gis',
            location: 'https://cdn.rawgit.com/cmv/cmv-app/develop/viewer/js/gis'
        }, {
            name: 'cmvConfig',
            location: 'https://cdn.rawgit.com/cmv/cmv-app/develop/viewer/js/config'
        }, {
            name: 'proj4js',
            location: '//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15'
        /* calcite maps */
        }, {
            name: 'bootstrap',
            location: 'https://cdn.rawgit.com/esri/calcite-maps/v0.0.3/dist/vendor/dojo-bootstrap'
        }, {
            name: 'calcite-maps',
            location: 'https://cdn.rawgit.com/esri/calcite-maps/v0.0.3/dist/js/dojo'
        /* end calcite maps */
        }, {
            name: 'config',
            location: path + 'config'
        }, {
            name: 'widgets',
            location: path + 'widgets'
        }]
    };

    require(window.dojoConfig, [
        'dojo/_base/declare',

        // minimal Base Controller
        'viewer/_ControllerBase',

        // *** Controller Mixins
        // Use the core mixins, add custom mixins
        // or replace core mixins with your own
        'viewer/_ConfigMixin', // manage the Configuration
        'viewer/_LayoutMixin', // build and manage the Page Layout and User Interface
        'viewer/_MapMixin', // build and manage the Map
        'viewer/_WidgetsMixin',

        'config/_CalciteMixin'

    ], function (
        declare,

        _ControllerBase,
        _ConfigMixin,
        _LayoutMixin,
        _MapMixin,
        _WidgetsMixin,

        _CalciteMixin

    ) {
        var controller = new (declare([
            _ControllerBase,
            _ConfigMixin,
            _LayoutMixin,
            _MapMixin,
            _WidgetsMixin,

            _CalciteMixin
        ]))();
        controller.startup();
    });
})();