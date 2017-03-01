(function () {
	'use strict';
	angular.module('inAppPurchases.config', [])
		.constant("IN_APP_PURCHASES",
			{
				iOS: [
					'monthly_subscription'
				],
				Android: [

				]
			}
		)
}());
