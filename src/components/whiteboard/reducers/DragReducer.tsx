import Whiteboard from "../Whiteboard";
import Square from "../square/Square";
import React from "react";

class DragReducer {

    whiteboard: Whiteboard;
    dragging: boolean;
    draggingTarget?: Square;
    dragPrevX?: number;
    dragPrevY?: number;

    constructor(whiteboard: Whiteboard) {
        this.whiteboard = whiteboard;
        this.dragging = false;
    }

    handleDrag = (event: React.MouseEvent) => {
        const {clientX, clientY} = event;

        const offsetX = clientX - this.dragPrevX!;
        const offsetY = clientY - this.dragPrevY!;
        this.dragTo(offsetX, offsetY, () => {
            this.dragPrevX = clientX;
            this.dragPrevY = clientY;

            const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

            const pointerY = clientY - offsetTop!;
            const pointerX = clientX - offsetLeft!;

            this.whiteboard.scrollReducer.scrollWithEdge(pointerX, pointerY);
        });
    }

    dragInit(target: Square, event: React.MouseEvent) {
        this.draggingTarget = target;
        this.dragging = true;
        this.dragPrevX = event.clientX;
        this.dragPrevY = event.clientY;
    }

    dragStop() {
        this.draggingTarget?.setState((prev) => ({
            ...prev,
            dragging: false
        }), () => {
            this.dragging = false;
            this.draggingTarget = undefined;
        })
    }

    dragTo = (offsetX: number, offsetY: number, callback?: () => void) => {
        if (this.dragging && this.draggingTarget) {
            this.draggingTarget.setState((prev) => ({
                ...prev,
                x: 0 <= prev.x + offsetX ?
                    prev.x + prev.width + offsetX <= this.whiteboard.state.width ?
                        prev.x + offsetX
                        :
                        this.whiteboard.state.width - prev.width!
                    :
                    0,
                y: 0 <= prev.y + offsetY ?
                    prev.y + prev.height + offsetY <= this.whiteboard.state.height ?
                        prev.y + offsetY
                        :
                        this.whiteboard.state.height - prev.height!
                    :
                    0
            }), callback);
        }
    }
}

export default DragReducer;