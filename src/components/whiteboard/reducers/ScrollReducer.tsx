import Whiteboard from "../Whiteboard";
import React from "react";

export type ScrollDirection = "t" | "tr" | "r" | "br" | "b" | "bl" | "l" | "tl";

class ScrollReducer {

    private whiteboard: Whiteboard;
    private scrollIntervalId?: NodeJS.Timeout;
    private scrollInterval = 0.5;
    private scrollStep = 1;
    private scrollEdge = 100;
    private scrollDirection?: ScrollDirection;
    private scrollPrevX?: number;
    private scrollPrevY?: number;

    constructor(whiteboard: Whiteboard) {
        this.whiteboard = whiteboard;
    }

    handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const {scrollTop, scrollLeft} = event.currentTarget;

        const offsetX = scrollLeft - this.scrollPrevX!;
        const offsetY = scrollTop - this.scrollPrevY!;

        if (this.whiteboard.dragReducer.dragging && this.whiteboard.dragReducer.draggingTarget) {
            this.whiteboard.dragReducer.dragTo(offsetX, offsetY, () => this.scrollStart(scrollLeft, scrollTop));
        }
        if (this.whiteboard.resizeReducer.resizing && this.whiteboard.resizeReducer.resizingTarget) {
            this.whiteboard.resizeReducer.resizeTo(offsetX, offsetY, () => this.scrollStart(scrollLeft, scrollTop));
        }
    }

    scrollStart(x?: number, y?: number) {
        this.scrollPrevX = x || this.whiteboard.ref.current?.parentElement?.scrollLeft;
        this.scrollPrevY = y || this.whiteboard.ref.current?.parentElement?.scrollTop;
    }

    scrollStop() {
        clearInterval(this.scrollIntervalId);
        this.scrollDirection = undefined;
    }

    scrollWithEdge(x: number, y: number) {
        const {offsetWidth, offsetHeight} = this.whiteboard.ref.current?.parentElement!;

        if (y < this.scrollEdge && x < this.scrollEdge) {
            this.scrollTo("tl");
        } else if (y > offsetHeight - this.scrollEdge && x < this.scrollEdge) {
            this.scrollTo("bl");
        } else if (y < this.scrollEdge && x > offsetWidth - this.scrollEdge) {
            this.scrollTo("tr");
        } else if (y > offsetHeight - this.scrollEdge && x > offsetWidth - this.scrollEdge) {
            this.scrollTo("br");
        } else if (y < this.scrollEdge) {
            this.scrollTo("t");
        } else if (x < this.scrollEdge) {
            this.scrollTo("l");
        } else if (y > offsetHeight - this.scrollEdge) {
            this.scrollTo("b");
        } else if (x > offsetWidth - this.scrollEdge) {
            this.scrollTo("r");
        } else {
            this.scrollStop();
        }
    }

    scrollToEdge(clientX: number, clientY: number) {
        const {offsetTop, offsetLeft} = this.whiteboard.ref.current!;

        const pointerY = clientY - offsetTop!;
        const pointerX = clientX - offsetLeft!;

        this.scrollWithEdge(pointerX, pointerY);
    }

    private scrollTo = (direction: ScrollDirection) => {
        if (this.scrollDirection === direction) {
            return;
        }

        this.scrollStop();

        this.scrollDirection = direction;
        switch (direction) {
            case "t": {
                this.scroll(0, -this.scrollStep);
                break;
            }
            case "tr": {
                this.scroll(this.scrollStep, -this.scrollStep);
                break;
            }
            case "r": {
                this.scroll(this.scrollStep, 0);
                break;
            }
            case "br": {
                this.scroll(this.scrollStep, this.scrollStep);
                break;
            }
            case "b": {
                this.scroll(0, this.scrollStep);
                break;
            }
            case "bl": {
                this.scroll(-this.scrollStep, this.scrollStep);
                break;
            }
            case "l": {
                this.scroll(-this.scrollStep, 0);
                break;
            }
            case "tl": {
                this.scroll(-this.scrollStep, -this.scrollStep);
                break;
            }
        }
    }

    private scroll = (offsetX: number, offsetY: number) => {
        this.scrollIntervalId = setInterval(() => {
            const {scrollWidth, scrollHeight, scrollTop, scrollLeft} = this.whiteboard.ref.current?.parentElement!;
            const scrollToTop = scrollTop + offsetY;
            const scrollToLeft = scrollLeft + offsetX;
            if (this.whiteboard.dragReducer.dragging || this.whiteboard.resizeReducer.resizing) {
                this.whiteboard.ref.current?.parentElement?.scrollTo({
                    left: 0 <= scrollToLeft ? scrollToLeft <= scrollWidth ? scrollToLeft : 0 : 0,
                    top: 0 <= scrollToTop ? scrollToTop <= scrollHeight ? scrollToTop : 0 : 0,
                });
            } else {
                this.scrollStop();
            }
        }, this.scrollInterval);
    }
}

export default ScrollReducer;