define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/query',

    'dijit/registry',

    'put-selector',

    'dojo/text!./templates/Calcite/titlePane.html',
    'dojo/text!./templates/Calcite/contentPane.html',
    'dojo/text!./templates/Calcite/floating.html',
    'dojo/text!./templates/Calcite/menuItem.html',

    // Bootstrap
    'bootstrap/Collapse',
    'bootstrap/Modal'

], function (
    declare,
    lang,
    array,
    on,
    domQuery,

    registry,

    put,

    titlePaneTemplate,
    contentPaneTemplate,
    floatingTemplate,
    menuItemTemplate
) {

    return declare(null, {

        calciteItems: {
            titlePane: {
                template: titlePaneTemplate,
                container: domQuery('div.calcite-panels[role="tablist"]')[0],
                dataToggle: 'tab',
                maxOpen: 1, // for calcite panes, only 1 is allowed
                opened: 0
            },
            contentPane: {
                template: contentPaneTemplate,
                container: window.document.body
            },
            floating: {
                template: floatingTemplate,
                container: window.document.body,
                dataToggle: 'modal'
            },
            menuItem: {
                template: menuItemTemplate,
                container: domQuery('div.calcite-dropdown > ul')[0]
            }
        },

        panelWidgetOpened: false,

        postConfig: function () {
            for (var key in this.calciteItems) {
                if (this.calciteItems.hasOwnProperty(key)) {
                    var item = this.calciteItems[key];
                    if (item.selector && !item.container) {
                        item.container = domQuery(item.selector)[0];
                    }
                }
            }

            this.config.widgets['calcite-loader'] = {
                include: true,
                type: 'invisible',
                path: 'dijit/_WidgetBase',
                options: {
                    startup: lang.hitch(this, function () {
                        require([
                            'dojo/domReady!',
                            'calcite-maps/calcitemaps-v0.3'
                        ], lang.hitch(this, function () {
                            domQuery('.calcite-panels .panel .panel-collapse').on('hidden.bs.collapse', function (e) {
                                var parentNodes = domQuery(e.target.parentNode);
                                parentNodes.addClass('collapse');
                                domQuery(parentNodes[0].parentNode).removeClass('maximize');
                            });
                            domQuery('.calcite-panels .panel .panel-collapse').on('show.bs.collapse', lang.hitch(this, function (e) {
                                domQuery(e.target.parentNode).removeClass('collapse');
                                this._resizePanelWidgets(e.target.parentNode);
                            }));
                            domQuery('.calcite-panels .panel').on('hidden.bs.collapse', function (e) {
                                domQuery(e.target.parentNode).removeClass('maximize');
                            });
                        }));
                    })
                }
            };

            return this.inherited(arguments);
        },

        // no need to execute these methods in _LayoutMixin so override them
        initPanes: function () {},

        // mimic the dojo panes
        createPanes: function () {
            var key,
                type = 'pane',
                panes = this.config.panes;

            function properCaseString (s) {
                return s.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
                    return $1.toUpperCase();
                });
            }

            for (key in panes) {
                if (panes.hasOwnProperty(key)) {
                    //build the pane
                    var containerNodes = domQuery('.navbar-fixed-' + key);
                    var paneConfig = panes[key];
                    paneConfig.type = type;
                    paneConfig.title = paneConfig.title || properCaseString(key) + ' Pane';
                    paneConfig.iconClass = paneConfig.iconClass || 'fa-window-maximize';
                    paneConfig.menuTitle = paneConfig.menuTitle || 'Show ' + paneConfig.title;
                    paneConfig.showInMenu = paneConfig.showInMenu || false;
                    paneConfig.canClose = paneConfig.canClose || true;
                    paneConfig.canMaximize = paneConfig.canMaximize || true;

                    this.calciteItems[type] = {
                        template: titlePaneTemplate,
                        container: containerNodes[0]
                    };
                    var retVal = this._createBootstrapWidget(key, paneConfig);
                    if (paneConfig.content) {
                        var paneNodes = domQuery('#' + retVal.containerNode);
                        if (paneNodes) {
                            paneNodes[0].innerHTML = paneConfig.content;
                        }
                    }

                    // add the pane to panes object for toggling
                    var paneID = 'cmv-' + type + '-' + key;
                    var nodes = domQuery('#' + paneID);
                    if (nodes) {
                        this.panes[paneID] = {
                            domNode: nodes[0]
                        };
                    }

                    on(window, 'resize', lang.hitch(this, '_resizePanelWidgets', containerNodes));
                    var bodyNodes = containerNodes.query('.panel-collapse');
                    var iconNodes = containerNodes.query('.panel-maximize');
                    on(iconNodes, 'click', function () {
                        containerNodes.addClass('maximize');
                        bodyNodes.collapse('show');
                    });
                    iconNodes = containerNodes.query('.panel-restore');
                    on(iconNodes, 'click', function () {
                        containerNodes.removeClass('maximize');
                        bodyNodes.collapse('show');
                    });
                }
            }
        },

        _resizePanelWidgets: function (selector) {
            var panelBody = domQuery(selector);
            array.forEach(panelBody, function (panel) {
                var panelWidgets = registry.findWidgets(panel);
                array.forEach(panelWidgets, function (widget) {
                    if (widget.resize && typeof(widget.resize) === 'function') {
                        window.setTimeout(function () {
                            widget.resize();
                        }, 10);
                    }
                });
            });
        },

        _createTitlePaneWidget: function (parentId, widgetConfig) {
            var item = this.calciteItems.titlePane;
            if (item.opened >= item.maxOpen) {
                widgetConfig.open = false;
            }
            var retVal = this._createBootstrapWidget(parentId, widgetConfig);
            if (widgetConfig.open) {
                item.opened++;
            }
            return retVal;
        },

        _createFloatingWidget: function (parentId, widgetConfig) {
            var retVal = this._createBootstrapWidget(parentId, widgetConfig);
            if (widgetConfig.openOnStartup || widgetConfig.open) {
                domQuery('#cmv-floating-' + parentId).modal('show');
            }
            return retVal;
        },

        _createContentPaneWidget: function (parentId, widgetConfig) {
            return this._createBootstrapWidget(parentId, widgetConfig);
        },

        _createBootstrapWidget: function (parentId, widgetConfig) {
            var item = this.calciteItems[widgetConfig.type],
                containerNode = window.document.body;

            if (item.container && item.template) {
                var type = widgetConfig.type,
                    iconClass = widgetConfig.iconClass || 'fa',
                    title = widgetConfig.title || 'Widget',
                    menuTitle = widgetConfig.menuTitle || title,
                    showInMenu = (widgetConfig.showInMenu !== false) ? true : false,
                    dataToggle = item.dataToggle;

                var opts = {
                    id: parentId,
                    hideCloseButton: (widgetConfig.canClose === false) ? '.hidden' : '',
                    hideMaximizeButton: (widgetConfig.canMaximize !== true) ? '.hidden' : '',
                    open: widgetConfig.open ? '.in' : '',
                    iconClass: iconClass.replace(/ /g, '.'),
                    type: type
                };

                put(item.container, lang.replace(item.template, opts), (type !== 'floating') ? title : '');

                if (showInMenu) {
                    item = this.calciteItems.menuItem;
                    opts.dataToggle = (dataToggle) ? '[data-toggle="' + dataToggle + '"]' : '';
                    opts.role = '[role="button"]';
                    var visibilityClass = widgetConfig.visibilityClass || 'show';
                    opts.visibilityClass = visibilityClass.replace(/ /g, '.');
                    put(item.container, lang.replace(item.template, opts), menuTitle);
                }

                containerNode = 'cmv-' + type + '-body-' + parentId;
            }

            return {
                containerNode: containerNode
            };
        }
    });
});