export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
        (val)   => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
        (error) => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  var cancelablePromise = {
    promise: wrappedPromise,
    isCanceled: false,
    cancel() {
      cancelablePromise.isCanceled = hasCanceled_ = true;
    },
  };

  return cancelablePromise;
};