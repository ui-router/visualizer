"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCancelable = function (promise) {
    var hasCanceled_ = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise.then(function (val) { return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val); }, function (error) { return hasCanceled_ ? reject({ isCanceled: true }) : reject(error); });
    });
    var cancelablePromise = {
        promise: wrappedPromise,
        isCanceled: false,
        cancel: function () {
            cancelablePromise.isCanceled = hasCanceled_ = true;
        },
    };
    return cancelablePromise;
};
//# sourceMappingURL=cancelablePromise.js.map