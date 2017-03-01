/**
 * Created by evgen on 01.03.17.
 */
(function () {
    'use strict';
    angular.module('privacyPolicy.routes', [
        'privacyPolicy'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('privacyPolicy', {
                    url: "/privacyPolicy",
                    cache: false,
                    clear: true,
                    templateUrl: "src/privacyPolicy/privacyPolicy.html",
                    controller: 'PrivacyPolicyCtrl'
                });
        });
})();