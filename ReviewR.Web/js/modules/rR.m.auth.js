﻿/// <reference path="../../Scripts/signals.js" />
/// <reference path="../fx/namespace.js" />
/// <reference path="../fx/syrah.js" />
/// <reference path="../rR.app.js" />
(function (sy, rR, undefined) {
    "use strict";

    function MoreDataViewModel(init) {
        var self = this;
        sy.DialogViewModel.apply(this);

        self.displayName = ko.observable('');
        self.email = ko.observable('');

        self.authToken = init.authToken;
        self.needName = init.needName || false;
        self.needEmail = init.needEmail || false;

        if (self.needName) {
            self.displayName.required('Display Name is required');
        }
        if (self.needEmail) {
            self.email.required('Email Address is required');
        }
        ko.validation.addValidation(self);

        self.submit = function () {
            self.validate();
            if (self.isValid()) {
                $.post(
                        '~/api/v1/sessions',
                        { authToken: self.authToken, email: self.email(), displayName: self.displayName() })
                        .success(function (data) {
                            // Grab the rest of the user data and send it to the app level login action
                            sy.bus.auth.setToken.publish(data.user);

                            // Dismiss the dialog
                            self.close();
                        })
                        .statusCode({
                            400: function (xhr) {
                                // Still not enough data?
                                self.customError('There was a validation error on the server');
                            },
                            409: function () {
                                // Conflict, someone already has this email address
                                self.customError('Someone already has that email address registered!');
                            },
                        });
            }
        }
    }

    function LoginViewModel() {
        var self = this;

        // Actions
        self.makeLoginHandler = function (id, url) {
            return function () {
                // Send OAuth token to server
                var loginResp = doauth(id, rR.app.resolveUrl(url));
            }
        };
    }

    function doauth(type, urlTemplate, tokenExtractor) {
        if (!tokenExtractor) {
            tokenExtractor = function (args) { return { token: args.access_token }; }
        }

        var redirectUrl = rR.app.resolveUrl('~/auth/' + type, true);
        var resp = window.showModalDialog(urlTemplate.replace(/__LAND__/, redirectUrl));
        if (resp.success) {
            $.ajax({
                url: '~/api/v1/sessions/' + type,
                type: 'post',
                data: tokenExtractor(resp.args)
            })
                .done(function (data) {
                    sy.bus.dialog.dismiss.publish();
                    sy.bus.auth.setToken.publish(data.user);
                })
                .statusCode({
                    400: function (xhr, textStatus, errorThrown) {
                        var data = JSON.parse(xhr.responseText);
                        alert('Sorry, your Auth provider didn\'t provide the following required info. At the moment, we require this information:\r\n\r\n' + data.missingFields.join('\r\n'));
                    }
                });
        } else {
            alert('Error authenticating!');
        }
    }

    // Set up the module
    var auth = rR.module('auth', function () {
        var self = this;

        self.dialog('login', LoginViewModel);
        self.dialog('moreData', MoreDataViewModel);

        self.action('logout', function () {
            $.ajax('~/api/v1/sessions', { type: 'delete' })
                .done(function () {
                    sy.bus.auth.clearToken.publish();
                });
        });

        self.action('login', function () {
            this.showDialog('login');
        });

        self.action('moredata', function (authToken, missingFields) {
            this.showDialog('moreData', new MoreDataViewModel({
                authToken: authToken,
                needName: missingFields.indexOf('displayName') > -1, 
                needEmail: missingFields.indexOf('email') > -1
            }));
        });

        self.route('landing', 'auth/:type', function (type) {
            var args = {};
            if (location.hash) {
                var hash = location.hash;
                if (hash[0] === '#') {
                    hash = location.hash.substr(1);
                }
                var pairs = hash.split(/&/);
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split(/=/);
                    args[pair[0]] = pair[1];
                }
            }

            var success = true;
            if (args.error) {
                success = false;
            }

            window.returnValue = {
                type: type,
                args: args,
                success: success
            };
            window.close();
        });
    });
})(syrah, rR);