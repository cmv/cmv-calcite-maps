define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',

    'dojo/query',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/touch',
    'dojo/on',
    'dojo/keys',
    'dojo/_base/lang',

    'esri/dijit/ColorPicker',

    'dojo/text!./CalciteStyler/templates/CalciteStyler.html',

    'xstyle/css!./CalciteStyler/css/CalciteStyler.css'
],
function (
    declare, _WidgetBase, _TemplatedMixin,

    query, domClass, domStyle, touch, on, keys, lang,

    ColorPicker,

    template
) {

    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    var CALCITE_THEME_SELECTORS = {
        NAVBAR: '.calcite-navbar',
        DROPDOWN: '.calcite-dropdown',
        DROPDOWN_MENU: '.calcite-dropdown .dropdown-menu',
        PANELS: '.calcite-panels[role="tablist"]',
        MAP: '.calcite-map'
    };

    var CALCITE_THEME_STYLES = {
        BG_LIGHT: 'calcite-bg-light', // default
        BG_DARK: 'calcite-bg-dark',
        BG_CUSTOM: 'calcite-bg-custom',
        TEXT_LIGHT: 'calcite-text-light',
        TEXT_DARK: 'calcite-text-dark', // default
        WIDGETS_DARK: 'calcite-widgets-dark',
        WIDGETS_LIGHT: 'calcite-widgets-light', // default
        RGBA_DEFAULT: '' // default (no bg color)
    };

    var CALCITE_LAYOUT_STYLES = {
        // Custom layouts
        body: 'calcite-layout-large-title calcite-layout-small-title calcite-layout-inline-right calcite-layout-inline-left ' +
            // Nav
            'calcite-nav-top calcite-nav-bottom calcite-nav-top-fixed calcite-nav-bottom-fixed ' +
            // Nav space
            'calcite-margin-top calcite-margin-bottom calcite-margin-all ' +
            // Zoom
            'calcite-zoom-top-left calcite-zoom-top-right calcite-zoom-bottom-left calcite-zoom-bottom-right ' +
            // Minibar
            'calcite-nav-transparent',

        // Navbar
        nav: 'navbar-fixed-top navbar-fixed-bottom',

        // Panels
        panels: 'calcite-panels-right calcite-panels-left'
    };

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        baseClass: 'cmvCalciteStylerWidget',

        APP_LAYOUTS: {
            TOP: {
                navPosition: 'calcite-nav-top',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: ''
            },
            TOPSPACE: {
                navPosition: 'calcite-nav-top',
                navSpace: 'calcite-margin-top',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: ''
            },
            TOPSPACEALL: {
                navPosition: 'calcite-nav-top',
                navSpace: 'calcite-margin-all',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: ''
            },
            TOPFIXED: {
                navPosition: 'calcite-nav-top-fixed',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: ''
            },
            BOTTOM: {
                navPosition: 'calcite-nav-bottom',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: ''
            },
            BOTTOMSPACE: {
                navPosition: 'calcite-nav-bottom',
                navSpace: 'calcite-margin-bottom',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: ''
            },
            BOTTOMSPACEALL: {
                navPosition: 'calcite-nav-bottom',
                navSpace: 'calcite-margin-all',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: ''
            },
            BOTTOMFIXED: {
                navPosition: 'calcite-nav-bottom-fixed',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: ''
            },
            // Custom layouts...
            TOPSMALL: {
                navPosition: 'calcite-nav-top',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: 'calcite-layout-small-title'
            },
            BOTTOMSMALL: {
                navPosition: 'calcite-nav-bottom',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: 'calcite-layout-small-title'
            },
            TOPLARGE: {
                navPosition: 'calcite-nav-top',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: 'calcite-layout-large-title'
            },
            BOTTOMLARGE: {
                navPosition: 'calcite-nav-bottom',
                navSpace: '',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-bottom',
                layoutName: 'calcite-layout-large-title'
            },
            TOPINLINELEFT: {
                navPosition: 'calcite-nav-top',
                navSpace: 'calcite-margin-all',
                panelPosition: 'calcite-panels-right',
                zoomPosition: 'calcite-zoom-top-left',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: 'calcite-layout-inline-left'
            },
            TOPINLINERIGHT: {
                navPosition: 'calcite-nav-top',
                navSpace: 'calcite-margin-all',
                panelPosition: 'calcite-panels-left',
                zoomPosition: 'calcite-zoom-top-right',
                navFixedPosition: 'navbar-fixed-top',
                layoutName: 'calcite-layout-inline-right'
            }
        },

        this: null,

        activeLayout: null,

        // Default settings
        styleSettings: {
            navbar: {
                bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ''
            },
            dropdown: {
                bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ''
            },
            panel: {
                bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ''
            }
        },

        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------

        postCreate: function () {
            this.inherited(arguments);
            this.activeLayout = this.APP_LAYOUTS.TOPFIXED; //default
            this._initColorPicker();

            // is there a tab resize in
            window.setTimeout(function () {
                //query('#calcite-styler-layout-tab').tab('show');
                query('#calcite-styler-theme-tab').tab('show');
            }, 500);
        },

        _initColorPicker: function () {
            if (!this.colorPickerWidget) {
                this.colorPickerWidget = new ColorPicker({
                    required: false,
                    showRecentColors: false,
                    showTransparencySlider: false
                }, this.colorPickerDiv);
                this.colorPickerWidget.startup();
                this.colorPickerWidget.on('color-change', lang.hitch(this, '_setPickerColor'));
            }
        },

        //----------------------------------
        // Color
        //----------------------------------

        _setColor: function (e) {
            var style = e.target.value;
            // Update UI
            query('#colorThemeCollapse').removeClass('in');
            query('#colorCalciteCollapse').removeClass('in');
            query('#colorPickerCollapse').removeClass('in');
            switch (style) {
                // Show Calcite themes
            case 'theme':
                query('#colorThemeCollapse').collapse('show');
                break;
                // Show calcite colors
            case 'calcite':
                query('#colorCalciteCollapse').collapse('show');
                break;
                // Show custom colors
            case 'custom':
                query('#colorPickerCollapse').collapse('show');
                break;
            default:
                break;
            }
        },

        //----------------------------------
        // Calcite Themes
        //----------------------------------

        _setThemeColor: function (e) {
            // Get styles
            var theme = e.target.value,
                textStyle = '',
                bgStyle = '',
                bgRgbaColor = '',
                applyToAll = true;

            // Select light theme
            switch (theme) {
            case 'light':
                textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                break;
                // Select dark theme
            case 'dark':
                textStyle = CALCITE_THEME_STYLES.TEXT_LIGHT;
                bgStyle = CALCITE_THEME_STYLES.BG_DARK;
                bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                break;
            default:
                break;
            }

            // Update UI
            query('#settingsCalciteColorAll')[0].checked = true;
            query('#settingsPickerColorAll')[0].checked = true;
            query('#settingsTextColor')[0].value = textStyle;

            // Set styles
            this.setStyles(bgStyle, textStyle, bgRgbaColor, applyToAll);
            this.applyStyles();
        },

        //----------------------------------
        // Calcite Colors
        //----------------------------------

        _setCalciteColor: function (e) {
            // Get styles
            var bgColorStyle = e.target.value,
                bgStyle = '',
                bgRgbaColor = '',
                applyToAll = true,
                textStyle = e.target.options[e.target.selectedIndex].dataset.textcolor;
            bgStyle = CALCITE_THEME_STYLES.BG_CUSTOM;
            bgRgbaColor = this._getRgbaColorFromStyle(bgColorStyle); // Convert to RGB
            applyToAll = query('#settingsCalciteColorAll')[0].checked;

            // Update UI
            query('#settingsTextColor')[0].value = textStyle;

            // Set styles
            this.setStyles(bgStyle, textStyle, bgRgbaColor, applyToAll);
            this.applyStyles();
        },

        //----------------------------------
        // Color Picker
        //----------------------------------

        _setPickerColor: function (e) {
            e.color = e.color || this.colorPickerWidget.color;
            if (!e.color) {
                return;
            }
            // Get styles
            var bgStyle = CALCITE_THEME_STYLES.BG_CUSTOM,
                bgRbgaColor = 'rgba(' + e.color.r + ',' + e.color.g + ',' + e.color.b + ',' + e.color.a + ')',
                textStyle = null,
                applyToAll = query('#settingsCalciteColorAll')[0].checked;

            // Get the best complimentary text color
            var hsl = this._rgb2hsl(e.color.r, e.color.g, e.color.b);
            if (hsl.l < 0.55) {
                textStyle = CALCITE_THEME_STYLES.TEXT_LIGHT;
            } else {
                textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
            }

            // Update UI
            query('#settingsTextColor')[0].value = textStyle;

            // Set styles
            this.setStyles(bgStyle, textStyle, bgRbgaColor, applyToAll);
            this.applyStyles();
        },

        _setCalciteColorAll: function (e) {
            // Sync UI
            query('#settingsPickerColorAll')[0].checked = e.target.checked;
            // Set styles
            on.emit(query('#settingsCalciteColor')[0], 'change', {
                bubbles: true,
                cancelable: true
            });
        },

        _setPickerColorAll: function (e) {
            // Sync UI
            query('#settingsCalciteColorAll')[0].checked = e.target.checked;
            // Set styles
            on.emit(this.colorPickerWidget, 'color-change', {
                bubbles: true,
                cancelable: true
            });
        },

        //----------------------------------
        // Text Color
        //----------------------------------

        _setTextColor: function (e) {
            // Get styles
            var textStyle = e.target.value,
                applyToAll = query('#settingsCalciteColorAll')[0].checked;

            // Set styles
            this.setStyles(null, textStyle, null, applyToAll);
            this.applyStyles();
        },

        //--------------------------------------------------------------------
        // Tab - Layout
        //--------------------------------------------------------------------

        _setLayout: function (e) {
            var theme = e.target.value;
            // Add classes
            switch (theme) {
                // Default APP_LAYOUTS
            case 'layout-top': // default
                this.setLayout(this.APP_LAYOUTS.TOP);
                break;
            case 'layout-top-space':
                this.setLayout(this.APP_LAYOUTS.TOPSPACE);
                break;
            case 'layout-top-space-all':
                this.setLayout(this.APP_LAYOUTS.TOPSPACEALL);
                break;
            case 'layout-top-fixed':
                this.setLayout(this.APP_LAYOUTS.TOPFIXED);
                break;
            case 'layout-bottom':
                this.setLayout(this.APP_LAYOUTS.BOTTOM);
                break;
            case 'layout-bottom-space':
                this.setLayout(this.APP_LAYOUTS.BOTTOMSPACE);
                break;
            case 'layout-bottom-space-all':
                this.setLayout(this.APP_LAYOUTS.BOTTOMSPACEALL);
                break;
            case 'layout-bottom-fixed':
                this.setLayout(this.APP_LAYOUTS.BOTTOMFIXED);
                break;
                // Custom APP_LAYOUTS
            case 'calcite-layout-small-title-top':
                this.setLayout(this.APP_LAYOUTS.TOPSMALL);
                break;
            case 'calcite-layout-small-title-bottom':
                this.setLayout(this.APP_LAYOUTS.BOTTOMSMALL);
                break;
            case 'calcite-layout-large-title-top':
                this.setLayout(this.APP_LAYOUTS.TOPLARGE);
                break;
            case 'calcite-layout-large-title-bottom':
                this.setLayout(this.APP_LAYOUTS.BOTTOMLARGE);
                break;
            case 'calcite-layout-inline-left':
                this.setLayout(this.APP_LAYOUTS.TOPINLINELEFT);
                break;
            case 'calcite-layout-inline-right':
                this.setLayout(this.APP_LAYOUTS.TOPINLINERIGHT);
                break;
            default:
                this.setLayout(this.APP_LAYOUTS.TOP);
                break;
            }
        },

        _setPanel: function (e) {
            var panels = query(CALCITE_THEME_SELECTORS.PANELS)[0],
                panelStyle = e.target.value;
            domClass.remove(panels, 'calcite-panels-left calcite-panels-right');
            domClass.add(panels, panelStyle);
        },

        _setMenu: function (e) {
            var menu = query(CALCITE_THEME_SELECTORS.DROPDOWN_MENU)[0],
                menuStyle = e.target.value;
            domClass.remove(menu, 'calcite-menu-drawer');
            domClass.add(menu, menuStyle);
        },

        //--------------------------------------------------------------------------
        //
        //  Private Functions
        //
        //--------------------------------------------------------------------------

        _rgb2hsv: function () {
            var rr, gg, bb,
                r = arguments[0] / 255,
                g = arguments[1] / 255,
                b = arguments[2] / 255,
                h, s,
                v = Math.max(r, g, b),
                diff = v - Math.min(r, g, b);
            function diffc (c) {
                return (v - c) / 6 / diff + 1 / 2;
            }

            if (diff === 0) {
                h = s = 0;
            } else {
                s = diff / v;
                rr = diffc(r);
                gg = diffc(g);
                bb = diffc(b);

                if (r === v) {
                    h = bb - gg;
                } else if (g === v) {
                    h = (1 / 3) + rr - bb;
                } else if (b === v) {
                    h = (2 / 3) + gg - rr;
                }
                if (h < 0) {
                    h += 1;
                } else if (h > 1) {
                    h -= 1;
                }
            }
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                v: Math.round(v * 100)
            };
        },

        _rgb2hsl: function (r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    break;
                }
                h /= 6;
            }
            return {
                h: h,
                s: s,
                l: l
            };
        },

        _getRgbaColorFromStyle: function (calciteBgColorStyle) {
            var caliteColorStyle = '.' + calciteBgColorStyle,
                attr = 'backgroundColor';
            var ss = document.styleSheets;
            var rgba = '';
            for (var i = 0; i < ss.length; i++) {
                ss = document.styleSheets;
                var rules = ss[i].cssRules; // || ss[i].rules;
                if (rules) {
                    for (var j = 0; j < rules.length; j++) {
                        if (rules[j].selectorText === caliteColorStyle) {
                            rgba = rules[j].style[attr];
                        }
                    }
                }
            }
            return rgba;
        },

        //--------------------------------------------------------------------------
        //
        //  Public Functions
        //
        //--------------------------------------------------------------------------

        setStyles: function (bgStyle, textStyle, bgRgbaColor, applyToAll) {
            // Navbar
            this.styleSettings.navbar.bgStyle = bgStyle || this.styleSettings.navbar.bgStyle;
            this.styleSettings.navbar.textStyle = textStyle || this.styleSettings.navbar.textStyle;
            this.styleSettings.navbar.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : this.styleSettings.navbar.bgRgbaColor;
            // Navbar only - reset
            if (!applyToAll) {
                // Dropdown - reset
                this.styleSettings.dropdown.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                this.styleSettings.dropdown.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                this.styleSettings.dropdown.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                // Panel - reset
                this.styleSettings.panel.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                this.styleSettings.panel.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                this.styleSettings.panel.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
            } else {
                // Dropdown
                // this.styleSettings.dropdown.bgStyle = bgStyle || this.styleSettings.dropdown.bgStyle;
                // this.styleSettings.dropdown.textStyle = textStyle || this.styleSettings.dropdown.textStyle;
                // this.styleSettings.dropdown.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : this.styleSettings.dropdown.bgRgbaColor;
                // Panel
                this.styleSettings.panel.bgStyle = bgStyle || this.styleSettings.panel.bgStyle;
                this.styleSettings.panel.textStyle = textStyle || this.styleSettings.panel.textStyle;
                this.styleSettings.panel.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : this.styleSettings.panel.bgRgbaColor;
            }
        },

        applyStyles: function (/* applyToAll */) {
            // Navbar
            this.setBgThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, this.styleSettings.navbar.bgStyle);
            this.setTextThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, this.styleSettings.navbar.textStyle);
            this.setBgRgbaColor(CALCITE_THEME_SELECTORS.NAVBAR, this.styleSettings.navbar.bgRgbaColor);
            // Dropdown
            // this.setBgThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, this.styleSettings.dropdown.bgStyle);
            // this.setTextThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, this.styleSettings.dropdown.textStyle);
            // this.setBgRgbaColor(CALCITE_THEME_SELECTORS.DROPDOWN_MENU, this.styleSettings.dropdown.bgRgbaColor);
            // Panel
            this.setBgThemeStyle(CALCITE_THEME_SELECTORS.PANELS, this.styleSettings.panel.bgStyle);
            this.setTextThemeStyle(CALCITE_THEME_SELECTORS.PANELS, this.styleSettings.panel.textStyle);
            this.setBgRgbaColor(CALCITE_THEME_SELECTORS.PANELS, this.styleSettings.panel.bgRgbaColor);
        },

        // BgColor
        setBgColorStyle: function (cssSelector, bgColorStyle) {
            this.removeBgColorStyle(cssSelector);
            if (bgColorStyle !== 'default') {
                query(cssSelector).addClass(bgColorStyle);
            }
        },

        setBgRgbaColor: function (cssSelector, bgColorRgba) {
            query(cssSelector).attr('style', {
                'background-color': bgColorRgba
            });
        },

        removeBgColorStyle: function (cssSelector) {
            query(cssSelector).attr('class')[0].split(' ').forEach(function (val) {
                if (val.indexOf('calcite-bgcolor-') > -1) {
                    query(cssSelector).removeClass(val);
                }
            });
        },

        // Theme - text
        setTextThemeStyle: function (cssSelector, textColorStyle) {
            query(cssSelector).removeClass(CALCITE_THEME_STYLES.TEXT_LIGHT + ' ' + CALCITE_THEME_STYLES.TEXT_DARK);
            query(cssSelector).addClass(textColorStyle);
        },

        // Theme - bg
        setBgThemeStyle: function (cssSelector, bgColorStyle) {
            query(cssSelector).removeClass(CALCITE_THEME_STYLES.BG_LIGHT + ' ' + CALCITE_THEME_STYLES.BG_DARK + ' ' + CALCITE_THEME_STYLES.BG_CUSTOM);
            query(cssSelector).addClass(bgColorStyle);
        },


        //----------------------------------
        // Tab - Layout functions
        //----------------------------------

        setLayout: function (layout) {
            // Update layout
            this.activeLayout = layout;
            // Remove classes
            this.removeClasses();
            this.addClasses(layout);
        },

        addClasses: function (layout) {
            var body = query('body')[0],
                nav = query('nav')[0],
                panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
            domClass.add(body, layout.navPosition + ' ' + layout.navSpace + ' ' + layout.zoomPosition + ' ' + layout.layoutName);
            domClass.add(nav, layout.navFixedPosition);
            domClass.add(panels, layout.panelPosition);
        },

        removeClasses: function () {
            var body = query('body')[0],
                nav = query('nav')[0],
                panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
            domClass.remove(body, CALCITE_LAYOUT_STYLES.body);
            domClass.remove(nav, CALCITE_LAYOUT_STYLES.nav);
            domClass.remove(panels, CALCITE_LAYOUT_STYLES.panels);
        }

    });

});