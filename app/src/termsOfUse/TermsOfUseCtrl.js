/**
 * Created by evgen on 01.03.17.
 */
(function () {
    'use strict';
    angular.module('termsOfUse', [])
        .controller('TermsOfUseCtrl', function ($scope, $state) {
            $scope.submit = function () {
                $state.go('privacyPolicy');
            }
        })
})();