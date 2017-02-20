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
        var App = declare([

            // add custom mixins here...note order may be important and
            // overriding certain methods incorrectly may break the app
            // First on the list are last called last, for instance the startup
            // method on _ControllerBase is called FIRST, and _LayoutMixin is called LAST
            // for the most part they are interchangeable, except _ConfigMixin
            // and _ControllerBase
            //
            _LayoutMixin,
            _WidgetsMixin,
            // _WebMapMixin,
            _MapMixin,

            // Custom Mixin for Calcite Maps
            _CalciteMixin,

            // configMixin should be right before _ControllerBase so it is
            // called first to initialize the config object
            _ConfigMixin,

            // controller base needs to be last
            _ControllerBase

        ]);
        var app = new App();
        app.startup();
    });
})();