export interface DragDetails {
    initialClientX: number;
    initialClientY: number;
    lastClientX: number;
    lastClientY: number;
    newClientX: number;
    newClientY: number;
}
export interface DragCallback {
    (el: Element, event: Event, details: DragDetails): void;
}
export declare const dragActions: {
    move: (elementToMove: HTMLElement) => (elementBeingDragged: HTMLElement, event: MouseEvent, details: DragDetails) => void;
};
export declare function draggable(el: any, callback: DragCallback): () => any;
