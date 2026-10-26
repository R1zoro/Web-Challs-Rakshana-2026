/**
 * Webpack Production Bundle: vendor.chunk.js
 * Core Third-Party Runtime Helpers (Lodash/Chart/Crypto utilities subset)
 */
(function (global) {
    "use strict";

    var _util = {
        debounce: function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        throttle: function (func, limit) {
            var inThrottle;
            return function () {
                var args = arguments, context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(function () { inThrottle = false; }, limit);
                }
            };
        },
        formatBytes: function (bytes, decimals) {
            if (bytes === 0) return '0 Bytes';
            var k = 1024, dm = decimals < 0 ? 0 : decimals || 2, sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        clamp: function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        safeJsonParse: function (str, fallback) {
            try { return JSON.parse(str); } catch (e) { return fallback || null; }
        }
    };

    global._nrfUtils = _util;
})(typeof window !== "undefined" ? window : this);
