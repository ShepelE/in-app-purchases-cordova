/**
 * Created by evgen on 07.02.2017.
 */
(function () {
	'use strict';
	angular.module('inAppPurchases', [
		'ionicPopupWrapper.service',
		'inAppPurchases.service'
	])
		.controller('InAppPurchasesCtrl', function ($scope, $state, $stateParams, $timeout, IonicPopupWrapperService,
													InAppPurchasesService) {
			var isBlockedSubmit = false;
			$scope.IAP = InAppPurchasesService.getProducts();

			$scope.check = function (index) {
				var _checkedPurchase = _.find($scope.IAP, {checked: true});
				if (_checkedPurchase) {
					_checkedPurchase.checked = false;
				}
				$scope.IAP[index].checked = true;
			};

			$scope.submit = function () {
				// block submit button
				if (!isBlockedSubmit) {
					isBlockedSubmit = true;
					//need to find checked subscription
					var _activeSub = _.find($scope.IAP, {checked: true}); //it is already checked if any sub is checked
					if (_activeSub) {
						IonicPopupWrapperService.confirm({
							title: 'Confirm Your Subscription',
							template: 'Do you want to subscribe to Plan To Table ' +
							_activeSub.description + ' for ' + _activeSub.price +
							' per month? The subscription will give user a full application ' +
							'functionality. This subscription will automatically renew until canceled.',
							ok_cb: function () {
								InAppPurchasesService.subscribe().then(function (res) {
									$state.go('login');
								});
							}
						});
					}
				}
				// unblock submit button in a second
				$timeout(function () {
					isBlockedSubmit = false;
				}, 1000);
			};
		});
})();
