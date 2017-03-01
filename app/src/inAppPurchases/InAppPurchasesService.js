/**
 * Created by Konstantin Glushko on 15.11.16.
 */
(function () {
	'use strict';
	angular.module('inAppPurchases.service', [
		'LocalStorageModule',
		'function.service',
		//configs
		'inAppPurchases.config'
	])
		.service('InAppPurchasesService', function ($location, $ionicPopup,
	                                                localStorageService, FunctionService,
	                                                IN_APP_PURCHASES) {
			var _self = this;
			// to save a list of in-app purchases
			var _IAP = [];
			var _subscriptions = [];
			var _receipt = {};

			//returns link to _IAP, so we don't care when _IAP will be updated :)
			this.getProducts = function () {
				return _IAP;
			};
			this.getReceipt = function () {
				return _receipt;
			};
			this.getSubscriptions = function () {
				return _subscriptions;
			};

			// this method is called in app.js, this is the first init call
			this.loadProducts = function () {
				var _productIds = IN_APP_PURCHASES[device.platform];
				// get available products
				window.inAppPurchase
					.getProducts(_productIds)
					.then(function (products) {
						if (products.length) {
							products.forEach(function (product) {
								var productInfo = {
									id: product.productId,
									name: product.title,
									price: product.price,
									// we don't use full desc, we use only first sentance of desc
									description: product.description.substring(0, product.description.indexOf('.')),
									checked: false
								};
								_IAP.push(productInfo);
							});
						} else {
							// empty array - no available products
						}
						_self.getActiveSubscription();
					}, function (err) {
						// error getting a list of in-app purchases
						_self.getActiveSubscription();
					});
			};

			// in app.js loadProducts is called,
			// so call restorePurchases() there, in loadProducts
			// because they can't be called together
			// here we use results from _restore() to define if need to redirect user to payments or not
			// has only resolve function
			this.getActiveSubscription = function () {
				// _restore doesn't have reject
				return _restore().then(function (subscriptions) {
				//we are able to not use result, because we have it's local copy
					switch (window.device.platform) {
						case "iOS":
							// return false or subscription cut object
							return _receipt.purchaseState === 0
								&& {productId: _receipt.productId, receipt: _receipt};
							break;
						case "Android":
							var _activeSubscriptions = _subscriptions.filter(function (subscription) {
								return subscription.receipt.purchaseState == 0;
							});
							// return 0 or subscription object
							return _activeSubscriptions.length && _activeSubscriptions[0];
							break;
						default: //this shouldn't be used because of _checkDevice
							return false; // return false
							break;
					}
				});
			};

			// here we get all bought products to be able to define
			// if need to redirect user to payments or not
			// this method saves results locally
			// has only resolve function
			function _restore () {

				return window.inAppPurchase
					.restorePurchases()
					.then(function(data) {
						// iOS provides the receipt isolated from the restore data
						if (window.device && window.device.platform === "iOS") {
							return window.inAppPurchase
								.getReceipt()
								.then(function(receipt) {
									FunctionService.cloneSafe(receipt, _receipt);
									return _receipt;
								}, function (err) {
									//returns _receipt anyway
									return _receipt;
								});
						} else { // Android provides the receipts with the restore data
							FunctionService.cloneSafe(data, _subscriptions);
							return _subscriptions;
						}
					}, function (err) {
						//returns _subscriptions anyway
						return _subscriptions;
					});
			}

			this.subscribe = function () {
				return inAppPurchase
					.subscribe(_product.id)
					.then(function (data) {
						_restore ();
						return data;
					});
			};
		});
})();
