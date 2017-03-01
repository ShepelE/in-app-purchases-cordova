/**
 * Created by evgen on 07.04.16.
 */
(function () {
    'use strict';
    angular.module('function.service', [ ])
        .service('FunctionService', function () {
            //supersafe copying of complex objects with saving of all links
            this.cloneSafe = function (fromObj, toObj) {
                var __dataCopy = JSON.parse(JSON.stringify(fromObj));
                for(var key in toObj) {
                    if(toObj.hasOwnProperty(key)) {
                        delete toObj[key];
                    }
                }
                for (var key in __dataCopy) {
                    if(__dataCopy.hasOwnProperty(key)) {
                        toObj[key] = __dataCopy[key];
                    }
                }
            };

            //clear all properties of simple object with saving link
            this.clearObj = function (obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        obj[key] = null;
                    }
                }
            };

            //clear all properties of simple object with saving link
            this.deleteAllFromObj = function (obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        delete obj[key];
                    }
                }
            };
        });
})();