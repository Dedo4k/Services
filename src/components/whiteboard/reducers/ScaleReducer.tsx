import Whiteboard from "../Whiteboard";
import React from "react";

class ScaleReducer {

    whiteboard: Whiteboard;
    maxScale: number;
    minScale: number;
    scaleStep: number;

    constructor(whiteboard: Whiteboard) {
        this.whiteboard = whiteboard;
        this.maxScale = 2;
        this.minScale = 0.5;
        this.scaleStep = 0.05;
    }

    handleWheel = (event: WheelEvent) => {
        if (event.ctrlKey) {
            event.preventDefault();
            if (event.deltaY < 0) {
                this.handleScaleUp();
            } else {
                this.handleScaleDown();
            }
        }
    }

    handleScaleUp = () => {
        const checkScaleOrGetMax = (prev: number) => {
            const newScale = prev + this.scaleStep;
            if (newScale < this.maxScale) {
                return newScale;
            } else {
                return this.maxScale;
            }
        }

        this.whiteboard.setState((prev) => ({
            ...prev,
            scale: checkScaleOrGetMax(prev.scale)
        }));
    }

    handleScaleDown = () => {
        const checkScaleOrGetMin = (prev: number) => {
            const newScale = prev - this.scaleStep;
            if (newScale > this.minScale) {
                return newScale;
            } else {
                return this.minScale;
            }
        }

        this.whiteboard.setState((prev) => ({
            ...prev,
            scale: checkScaleOrGetMin(prev.scale)
        }));
    }
}

export default ScaleReducer;