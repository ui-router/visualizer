/** This animation code was taken from trangular.js, and is used to interpolate 2 arrays of values using an easing fn */
export declare function animatePath(newValue: any, oldValue: any, duration: any, updateFrame: any, finishFn?: () => void, easeFn?: (t: any, b: any, c: any, d: any) => any): () => void;
