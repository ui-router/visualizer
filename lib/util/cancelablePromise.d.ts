export declare const makeCancelable: (promise: any) => {
    promise: Promise<{}>;
    isCanceled: boolean;
    cancel(): void;
};
