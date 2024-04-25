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

        const y = clientY - this.whiteboard.ref.current?.offsetTop! + this.whiteboard.ref.current?.parentElement?.scrollTop!;
        const x = clientX - this.whiteboard.ref.current?.offsetLeft! + this.whiteboard.ref.current?.parentElement?.scrollLeft!;

        const {minHeight, minWidth} = this.resizingTarget?.state!;

        switch (this.resizeDirection) {
            case "top": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    y: y > 0 ? prev.y - y + prev.height >= minHeight ? y : prev.y : 0,
                    height: prev.y - y + prev.height >= minHeight ? prev.y - y + prev.height : prev.height
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "right": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    width: x - prev.x
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "bottom": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    height: y - prev.y
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "left": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    x: x > 0 ? prev.x - x + prev.width >= minWidth ? x : prev.x : 0,
                    width: prev.x - x + prev.width >= minWidth ? prev.x - x + prev.width : prev.width
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "top-right": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    y: prev.y - y + prev.height >= minHeight ? y : prev.y,
                    width: x - prev.x,
                    height: prev.y - y + prev.height >= minHeight ? prev.y - y + prev.height : prev.height
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "bottom-right": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    width: x - prev.x,
                    height: y - prev.y
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "bottom-left": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    x: x > 0 ? prev.x - x + prev.width >= minWidth ? x : prev.x : 0,
                    width: prev.x - x + prev.width >= minWidth ? prev.x - x + prev.width : prev.width,
                    height: y - prev.y
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
                break;
            }
            case "top-left": {
                this.resizingTarget?.setState((prev) => ({
                    ...prev,
                    x: x > 0 ? prev.x - x + prev.width >= minWidth ? x : prev.x : 0,
                    y: y > 0 ? prev.y - y + prev.height >= minHeight ? y : prev.y : 0,
                    width: prev.x - x + prev.width >= minWidth ? prev.x - x + prev.width : prev.width,
                    height: prev.y - y + prev.height >= minHeight ? prev.y - y + prev.height : prev.height
                }), () => {
                    this.whiteboard.scrollReducer.scrollToEdge(clientX, clientY);
                });
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
                    }), callback);
                }
                break;
            }
            case "right": {
                if (width + offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        width: prev.x + prev.width + offsetX <= this.whiteboard.state.width ? prev.width + offsetX : this.whiteboard.state.width - prev.x
                    }), callback);
                }
                break;
            }
            case "bottom": {
                if (height + offsetY >= minHeight) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        height: prev.y + prev.height + offsetY <= this.whiteboard.state.height ? prev.height + offsetY : this.whiteboard.state.height
                    }), callback);
                }
                break;
            }
            case "left": {
                if (width - 2 * offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        x: prev.x + offsetX > 0 ? prev.x + offsetX : 0,
                        width: prev.width - offsetX
                    }), callback);
                }
                break;
            }
            case "top-right": {
                if (height - 2 * offsetY >= minHeight && width + offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        y: prev.y + offsetY >= 0 ? prev.y + offsetY : 0,
                        width: prev.x + prev.width + offsetX <= this.whiteboard.state.width ? prev.width + offsetX : this.whiteboard.state.width - prev.x,
                        height: prev.height - offsetY
                    }), callback);
                }
                break;
            }
            case "bottom-right": {
                if (height + offsetY >= minHeight && width + offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        width: prev.x + prev.width + offsetX <= this.whiteboard.state.width ? prev.width + offsetX : this.whiteboard.state.width - prev.x,
                        height: prev.y + prev.height + offsetY <= this.whiteboard.state.height ? prev.height + offsetY : this.whiteboard.state.height
                    }), callback);
                }
                break;
            }
            case "bottom-left": {
                if (height + offsetY >= minHeight && width - 2 * offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        x: prev.x + offsetX > 0 ? prev.x + offsetX : 0,
                        width: prev.width - offsetX,
                        height: prev.y + prev.height + offsetY <= this.whiteboard.state.height ? prev.height + offsetY : this.whiteboard.state.height
                    }), callback);
                }
                break;
            }
            case "top-left": {
                if (height - 2 * offsetY >= minHeight && width - 2 * offsetX >= minWidth) {
                    this.resizingTarget?.setState((prev) => ({
                        ...prev,
                        x: prev.x + offsetX > 0 ? prev.x + offsetX : 0,
                        y: prev.y + offsetY >= 0 ? prev.y + offsetY : 0,
                        width: prev.width - offsetX,
                        height: prev.height - offsetY
                    }), callback);
                }
                break;
            }
        }
    }
}

export default ResizeReducer;