/**
 * Created by evgen on 01.03.17.
 */
(function () {
    'use strict';
    angular.module('termsOfUse.routes', [
        'termsOfUse'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('termsOfUse', {
                    url: "/termsOfUse",
                    cache: false,
                    clear: true,
                    templateUrl: "src/termsOfUse/termsOfUse.html",
                    controller: 'TermsOfUseCtrl'
                });
        });
})();