import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ArrowCoords} from './arrow-coords';

@Directive({selector: '[directArrow]'})
export class DirectionalArrowDirective {
    constructor(private templateRef: TemplateRef<number>, private viewContainer: ViewContainerRef) {
    }

    @Input() set directArrow(angle: number) {
        if (angle) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.drawArrow(angle);
        } else {
            // Else remove template from DOM
            this.viewContainer.clear();
        }
    }


    private drawArrow(angle: number): void {
        let canvas = this.templateRef.elementRef.nativeElement.nextElementSibling,
            angleRad = angle * Math.PI / 180,
            coords = this.getArrowCoords(canvas, angleRad);

        this.drawArrowInCanvas(canvas, angleRad, coords);
    }

    // TODO: move it into service in future
    private getArrowCoords(canvas: HTMLCanvasElement, angle: number): ArrowCoords {
        let fromX, fromY, toX, toY,
            bias = 6,
            centralPoint = (canvas.width) / 2,
            radius = centralPoint - bias,
            distX = Math.cos(angle) * radius,
            distY = Math.sin(angle) * radius;

        fromX = centralPoint - distX;
        fromY = centralPoint - distY;
        toX = centralPoint + distX;
        toY = centralPoint + distY;

        return {fromX, fromY, toX, toY};
    }

    // TODO: move it into service in future
    private drawArrowInCanvas(canvas: HTMLCanvasElement, angle: number, coords: ArrowCoords) {
        const ctx = canvas.getContext('2d'),
            headLength = 5,
            lineWidth = 5,
            arrowColor = '#cc0000';

        // starting path of the arrow from the start square to the end square and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(coords.fromX, coords.fromY);
        ctx.lineTo(coords.toX, coords.toY);
        ctx.strokeStyle = arrowColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // starting a new path from the head of the arrow to one of the sides of the point
        ctx.beginPath();
        ctx.moveTo(coords.toX, coords.toY);
        ctx.lineTo(coords.toX - headLength * Math.cos(angle - Math.PI / 8), coords.toY - headLength * Math.sin(angle - Math.PI / 8));

        // path from the side point of the arrow, to the other side point
        ctx.lineTo(coords.toX - headLength * Math.cos(angle + Math.PI / 8), coords.toY - headLength * Math.sin(angle + Math.PI / 8));

        // path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctx.lineTo(coords.toX, coords.toY);
        ctx.lineTo(coords.toX - headLength * Math.cos(angle - Math.PI / 8), coords.toY - headLength * Math.sin(angle - Math.PI / 8));

        // draws the paths created above
        ctx.strokeStyle = arrowColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.fillStyle = arrowColor;
        ctx.fill();
    }


}