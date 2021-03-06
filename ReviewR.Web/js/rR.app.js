﻿/// <reference path="rR.models.js" />
/// <reference path="fx/syrah.js" />
// rR.app.js
// Core application code

(function (sy, undefined) {
    "use strict";

    namespace.define('rR', function (ns) {
        var _modules = [];
        ns.App = function (pageHost, dialogHost) {
            var self = this;
            sy.App.apply(self, [pageHost, dialogHost]);

            // Fields
            self.environment = ko.observable(sy.setting('environment') || '');
            self.version = ko.observable(sy.setting('version') || '');
            self.currentUser = ko.observable(new rR.models.User());
            self.appBarVisible = ko.observable(false);

            // Computed Properties
            self.isDataVolatile = ko.computed(function () {
                return self.environment() !== 'Production';
            });
            self.isDataBestEffort = ko.computed(function () {
                return self.environment() === 'Preview';
            });

            // Top-level commands
            self.logout = function () {
                sy.bus.exec.publish('auth.logout');
            };
            self.login = function () {
                sy.bus.exec.publish('auth.login');
            };

            sy.bus.register('auth.setToken').subscribe(function(user) {
                sy.utils.update(self.currentUser(), user);
                self.currentUser().loggedIn(true);
                self.router.refresh();
            });
            sy.bus.register('auth.clearToken').subscribe(function () {
                self.currentUser(new rR.models.User());
                self.router.refresh();
            });

            // If there's a token, initialize it
            var token = sy.setting('token');
            if (token) {
                sy.bus.auth.setToken.publish(JSON.parse(token));
            }
        };

        ns.start = function (rootUrl, environment, pageHost, dialogHost) {
            rR.app = new rR.App(rootUrl, environment, pageHost, dialogHost);

            for (var i = 0; i < _modules.length; i++) {
                rR.app.module(_modules[i]);
            }
            _modules = null;

            rR.app.start();
        }

        ns.module = function (name, fn) {
            /// <param name="name" type="String" />
            /// <param name="fn" type="Function" />
            var module = new sy.Module(name);
            fn.apply(module);

            if (rR.app) {
                // Inject it right away
                rR.app.module(module);
            }
            _modules.push(module);
            return module;
        }
    });

    $(function () {
        rR.start();
    });

    // Hijack all interior links
    $(document.body).on('click', 'a:not([data-link="exterior"],[href="#"],[href^="http:"],[href^="https:"],[href^="//"]),a[data-link="interior"]', function (evt) {
        // Send the URL to the router
        evt.preventDefault();
        sy.bus.navigate.publish($(this).attr('href'));
    });
})(syrah);