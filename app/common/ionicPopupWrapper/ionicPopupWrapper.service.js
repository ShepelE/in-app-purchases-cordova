/**
 * Created by evgen on 18.01.17.
 */
(function () {
	'use strict';
	angular.module('ionicPopupWrapper.service', [])
		.service('IonicPopupWrapperService', function ($ionicPopup) {
			this.confirm = function (settings) {
				//Need to ask if sure delete budgetCategory and all related items
				var confirmPopup = $ionicPopup.alert({
					title: settings.title || 'Attention',
					template: settings.template,
					buttons: [
						{
							text: settings.schema === 'YES_NO' && 'NO' || 'Cancel',
							type: settings.okClass || 'pt-grey',
							onTap: settings.cancel_cl
						},
						{
							text: settings.schema === 'YES_NO' && 'YES' || 'OK',
							type: settings.cancelClass || 'pt-energized',
							onTap: settings.ok_cb
						}
					]
				});
			};
		})
})();