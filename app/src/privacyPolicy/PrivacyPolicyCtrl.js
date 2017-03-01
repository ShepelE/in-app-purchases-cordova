/**
 * Created by evgen on 01.03.17.
 */
(function () {
    'use strict';
    angular.module('privacyPolicy', [])
        .controller('PrivacyPolicyCtrl', function ($scope, $state) {
            $scope.submit = function () {
                $state.go('inAppPurchases');
            }
        })
})();