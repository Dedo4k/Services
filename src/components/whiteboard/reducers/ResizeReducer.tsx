import Whiteboard from "../Whiteboard";
import Square from "../square/Square";
import React from "react";
import {ResizeDirection} from "../resizer/Resizer";

class ResizeReducer {

    whiteboard: Whiteboard;
    resizing: boolean;
    resizingTarget?: Square;
    resizeDirection?: ResizeDirection;
    resizePrevX?: number;
    resizePrevY?: number;

    constructor(whiteboard: Whiteboard) {
        this.whiteboard = whiteboard;
        this.resizing = false;
    }

    handleResize = (event: React.MouseEvent) => {
        const {clientX, clientY} = event;

        const offsetX = clientX - this.resizePrevX!;
        const offsetY = clientY - this.resizePrevY!;

        const {height, width, minHeight, minWidth} = this.resizingTarget?.state!;

        switch (this.resizeDirection) {
            case "top": {
                if (height - 2 * offsetY >= minHeight) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        y: prev.y + offsetY >= 0 ? prev.y + offsetY : 0,
                        height: prev.height - offsetY
                    }), () => {
                        this.resizePrevY = clientY;
                        const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

                        const pointerY = clientY - offsetTop!;
                        const pointerX = clientX - offsetLeft!;

                        this.whiteboard.scrollReducer.scrollWithEdge(pointerX, pointerY);
                    });
                }
                break
            }
            case "right": {
                if (width + offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        width: prev.x + prev.width + offsetX <= this.whiteboard.state.width ? prev.width + offsetX : this.whiteboard.state.width - prev.x
                    }), () => {
                        this.resizePrevX = clientX;
                        const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

                        const pointerY = clientY - offsetTop!;
                        const pointerX = clientX - offsetLeft!;

                        this.whiteboard.scrollReducer.scrollWithEdge(pointerX, pointerY);
                    });
                }
                break
            }
            case "bottom": {
                if (height + offsetY >= minHeight) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        height: prev.y + prev.height + offsetY <= this.whiteboard.state.height ? prev.height + offsetY : this.whiteboard.state.height
                    }), () => {
                        this.resizePrevY = clientY;
                        const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

                        const pointerY = clientY - offsetTop!;
                        const pointerX = clientX - offsetLeft!;

                        this.whiteboard.scrollReducer.scrollWithEdge(pointerX, pointerY);
                    });
                }
                break
            }
            case "left": {
                if (width - 2 * offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        x: prev.x + offsetX > 0 ? prev.x + offsetX : 0,
                        width: prev.width - offsetX
                    }), () => {
                        this.resizePrevX = clientX;
                        const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

                        const pointerY = clientY - offsetTop!;
                        const pointerX = clientX - offsetLeft!;

                        this.whiteboard.scrollReducer.scrollWithEdge(pointerX, pointerY);
                    });
                }
                break;
            }
        }
    }

    resizeStart(event: React.MouseEvent<HTMLDivElement>, target: Square, direction: ResizeDirection) {
        const {clientX, clientY} = event;

        this.resizingTarget = target;
        this.resizing = true;
        this.resizeDirection = direction;
        this.resizePrevX = clientX;
        this.resizePrevY = clientY;
    }

    resizeStop() {
        this.resizing = false;
        this.resizeDirection = undefined;
        this.resizingTarget = undefined;
    }

    resizeTo(offsetX: number, offsetY: number, callback: () => void) {
        const {height, width, minHeight, minWidth} = this.resizingTarget?.state!;

        switch (this.resizeDirection) {
            case "top": {
                if (height - 2 * offsetY >= minHeight) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        y: prev.y + offsetY >= 0 ? prev.y + offsetY : 0,
                        height: prev.height - offsetY
                    }), () => {
                        callback && callback();
                    });
                }
                break
            }
            case "right": {
                if (width + offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        width: prev.x + prev.width + offsetX <= this.whiteboard.state.width ? prev.width + offsetX : this.whiteboard.state.width - prev.x
                    }), () => {
                        callback && callback();
                    });
                }
                break
            }
            case "bottom": {
                if (height + offsetY >= minHeight) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        height: prev.y + prev.height + offsetY <= this.whiteboard.state.height ? prev.height + offsetY : this.whiteboard.state.height
                    }), () => {
                        callback && callback();
                    });
                }
                break
            }
            case "left": {
                if (width - 2 * offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        x: prev.x + offsetX > 0 ? prev.x + offsetX : 0,
                        width: prev.width - offsetX
                    }), () => {
                        callback && callback();
                    });
                }
                break;
            }
        }
    }
}

export default ResizeReducer;