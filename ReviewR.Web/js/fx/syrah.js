﻿/// <reference path="../../Scripts/signals.js" />
/// <reference path="namespace.js" />
/// <reference path="syrah.ajax.js" />
/// <reference path="syrah.routing.js" />
/// <reference path="syrah.rendering.js" />
/// <reference path="syrah.plugins.dom.js" />
/// <reference path="syrah.plugins.binding.js" />

// syrah - a system for modular JavaScript application development
(function (undefined) {
    "use strict";
    namespace.define('syrah', function (ns) {
        function autoconfig(key) {
            return document.documentElement.getAttribute('data-' + key);
        }

        function createViewHost(selectors) {
            var found;
            for (var i = 0; !found && i < arguments.length; i++) {
                found = syrah.plugins.dom.querySelector(arguments[i]);
            }
            if (!found) {
                throw 'view host not found!';
            }
            return syrah.plugins.binding.createViewHost(found);
        }

        function unwrapViewHost(funcOrObj) {
            if (typeof funcOrObj === "function") {
                return new funcOrObj();
            } else {
                return funcOrObj;
            }
        }

        ns.App = function (rootUrl, environment, pageHost, dialogHost) {
            var self = this;
            var _rootUrl = rootUrl || autoconfig('root');
            var _environment = environment || autoconfig('environment');
            var _pageHost = unwrapViewHost(pageHost) || createViewHost('#syrah-page-host');
            var _dialogHost = unwrapViewHost(dialogHost) || createViewHost('#syrah-dialog-host');
            var _modules = [];
            var _actions = {};
            var _running = false;
            
            syrah.ajax.init(_rootUrl);
            
            if (_environment === 'Development') {
                syrah.utils.enableAsserts();
            }

            self.router = new syrah.routing.Router();
            self.route = self.router.map;

            self.resolveUrl = function (vpath) {
                /// <param name="vpath" type="String" />
                if (vpath[0] === '~' && vpath[1] === '/') {
                    return _rootUrl + vpath.substr(1);
                }
                return vpath;
            };

            self.action = function (name, handler) {
                _actions[name] = handler;
            };
            
            self.module = function (module) {
                /// <param name="module" type="syrah.Module" />
                if (_running) {
                    module.attach(self);
                } else {
                    _modules.push(module);
                }
            };

            self.start = function (model) {
                _running = true;
                for (var i = 0; i < _modules.length; i++) {
                    _modules[i].attach(self);
                }

                // Bind the rest of the page
                syrah.plugins.binding.applyBindings(document.body, self);

                // Start the router
                self.router.start(_rootUrl);
            };

            self.openPage = function (view, model) {
                /// <param name="view" type="syrah.rendering.View" />
                /// <param name="model" type="Object" />
                _pageHost.setView(view, model);
            };

            self.showDialog = function (view, model) {
                /// <param name="view" type="syrah.rendering.View" />
                /// <param name="model" type="Object" />
                _pageHost.obscure();
                _dialogHost.showDialog(view, model);
            };

            self.refresh = function () {
                self.router.refresh();
            }

            self.closeDialog = function () {
                _dialogHost.closeDialog();
                _pageHost.reveal();
            };

            self.resolveUrl = function (url) {
                /// <param name="url" type="String" />
                if (url[0] === '~' && url[1] === '/') {
                    return _rootUrl + url.substr(2);
                }
                return _rootUrl + url;
            };

            syrah.bus.register('navigate', ['url']);
            syrah.bus.navigate.subscribe(function (url) {
                self.router.navigate(url);
            });

            syrah.bus.register('exec', ['action']);
            syrah.bus.exec.subscribe(function (action) {
                var act = _actions[action];
                syrah.utils.assert(act, 'no such action: ' + action);
                act();
            });

            syrah.bus.register('dialog.dismiss');
            syrah.bus.dialog.dismiss.subscribe(function () {
                self.closeDialog();
            });
        };

        ns.DialogViewModel = function () {
            var self = this;

            self.close = function () {
                syrah.bus.closeCurrentDialog && syrah.bus.closeCurrentDialog.publish();
            }
        };

        ns.Module = function (name) {
            var self = this;
            var _app;
            var _attached = new signals.Signal();
            var _routes = [];
            var _actions = [];
            var _moduleName = name;

            self.pages = {};
            self.dialogs = {};

            // Constrained "actor" object to use as this in route handlers. Of course, if you capture this before mixing in the module
            // class, there's nothing to stop you calling other methods.
            var _actor = { };

            self.attached = _attached;
            self.attach = function (app) {
                /// <param name="app" type="syrah.App" />
                // Capture the app
                _app = app;

                // Attach routes
                for (var i = 0; i < _routes.length; i++) {
                    app.route(_routes[i].name, _routes[i].url, _routes[i].handler);
                }

                // Attach actions
                for (var i = 0; i < _actions.length; i++) {
                    app.action(_actions[i].name, _actions[i].handler);
                }

                _attached.dispatch();
                return self;
            };
            // !!if VSDOC
            // self.attach(new syrah.App());
            // !!endif

            self.openPage = function (pageId, model) {
                /// <signature>
                ///     <summary>Opens the specified view, creating a new view model for it</summary>
                ///     <param name="pageId" type="String">The id of the view to open</param>
                /// </signature>
                /// <signature>
                ///     <summary>Opens the specified view, using the specified view model for it</summary>
                ///     <param name="pageId" type="String">The id of the view to open</param>
                ///     <param name="model" type="Object">The view model for the view</param>
                /// </signature>
                var view = getRequiredView(self.pages, pageId);
                _app.openPage(view, model);
            }
            _actor.openPage = self.openPage;

            self.showDialog = function (dialogId, model) {
                /// <signature>
                ///     <summary>Opens the specified view, creating a new view model for it</summary>
                ///     <param name="pageId" type="String">The id of the view to open</param>
                /// </signature>
                /// <signature>
                ///     <summary>Opens the specified view, using the specified view model for it</summary>
                ///     <param name="pageId" type="String">The id of the view to open</param>
                ///     <param name="model" type="Object">The view model for the view</param>
                /// </signature>
                var view = getRequiredView(self.dialogs, dialogId);
                _app.showDialog(view, model);
            }
            _actor.showDialog = self.showDialog;

            self.closeDialog = function () {
                _app.closeDialog();
            }
            _actor.closeDialog = self.closeDialog;

            self.route = function (name, url, handler) {
                var callback = function () { handler.apply(_actor, Array.prototype.slice.call(arguments)); }
                _routes.push({ name: _moduleName + '.' + name, url: url, handler: callback });
                // !!if VSDOC
                // callback();
                // !!endif
                return self;
            };

            self.action = function (name, handler) {
                var callback = function () { handler.apply(_actor, Array.prototype.slice.call(arguments)); }
                _actions.push({ name: _moduleName + '.' + name, handler: callback });
                // !!if VSDOC
                // callback();
                // !!endif
                return self;
            }

            self.page = function (id, modelConstructor, templateId) {
                /// <signature>
                ///     <param name="id" type="String">The id of the page, also used as the id of the template</param>
                ///     <param name="modelConstructor" type="Function">A function which, when called with 'new', creates the view model for this page</param>
                /// </signature>
                /// <signature>
                ///     <param name="id" type="String">The id of the page, NOT used as the id of the template</param>
                ///     <param name="modelConstructor" type="Function">A function which, when called with 'new', creates the view model for this page</param>
                ///     <param name="templateId" type="String">The id of the template to render for this page</param>
                /// </signature>
                return addView(self.pages, id, modelConstructor, templateId);
            }

            self.dialog = function (id, modelConstructor, templateId) {
                /// <signature>
                ///     <param name="id" type="String">The id of the page, also used as the id of the template</param>
                ///     <param name="modelConstructor" type="Function">A function which, when called with 'new', creates the view model for this page</param>
                /// </signature>
                /// <signature>
                ///     <param name="id" type="String">The id of the page, NOT used as the id of the template</param>
                ///     <param name="modelConstructor" type="Function">A function which, when called with 'new', creates the view model for this page</param>
                ///     <param name="templateId" type="String">The id of the template to render for this page</param>
                /// </signature>
                return addView(self.dialogs, id, modelConstructor, templateId);
            }

            function addView(container, id, modelConstructor, templateId) {
                if (container.hasOwnProperty(id)) {
                    throw 'a view named ' + id + ' has already been defined by this module';
                }

                if (templateId === undefined) {
                    templateId = id;
                }
                var view = new syrah.rendering.View(_moduleName + '.' + templateId, modelConstructor);
                container[id] = view;
                return view;
            }

            function getRequiredView(container, id) {
                if (!container.hasOwnProperty(id)) {
                    throw 'no such view: ' + id;
                }
                return container[id];
            }
        };
    });
})();