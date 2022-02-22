import Point from './point.model.js'
import { LINE, PARKING, RECTANGLE, SENSOR, BRUSH, PAINT, ERASER } from './tool.js'
import { getMouseCoordsOnCanvas, findDistance } from './utility.js'
import Fill from './fill.class.js'
export default class Paint {
    constructor(canvasId) {

        this.canvas = document.getElementById(canvasId)
        this.context = canvas.getContext("2d")
        this.undoStack = []
        this.undoLimit = 3

    }

    set activeTool(tool) {
        this.tool = tool
        console.log(this.tool)
    }

    set lineWidth(linewidth) {
        this._lineWidth = linewidth
        this.context.lineWidth = this._lineWidth
    }

    set selectedColor(color) {
        this.color = color
        this.context.strokeStyle = this.color

    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e)
    }

    onMouseDown(e) {

        this.saveData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        console.log(this.saveData)

        if (this.undoStack.length >= this.undoLimit) this.undoStack.shift()
        this.undoStack.push(this.saveData)




        this.canvas.onmousemove = e => this.onMouseMove(e)
        document.onmouseup = e => this.onMouseUp(e)

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas)
        

        if (this.tool == BRUSH) {
            this.context.beginPath()
            this.context.moveTo(this.startPos.x, this.startPos.y)
        } else if (this.tool == PAINT) {
            new Fill (this.canvas, this.startPos, this.color)
        } else if (this.tool == ERASER) {
            this.context.clearRect(this.startPos.x, this.startPos.y, this._lineWidth, this._lineWidth)

        }


    }

    onMouseMove(e) {

        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas)
        console.log(this.currentPos)

        switch (this.tool) {
            case LINE:
            case RECTANGLE:
            case SENSOR:
            case PARKING:

                this.drawShape()
                break
            case BRUSH:
                this.drawFreeLine(this._lineWidth)
                break
            case ERASER:
                this.context.clearRect(this.currentPos.x, this.currentPos.y, this._lineWidth, this._lineWidth)

            default:
                break
        }



    }

    onMouseUp(e) {
        this.canvas.onmousemove = null
        document.onmouseup = null

    }

    drawShape() {


        this.context.putImageData(this.saveData, 0, 0)
        this.context.beginPath()

        if (this.tool == LINE) {

            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineTo(this.currentPos.x, this.currentPos.y)
        } else if (this.tool == RECTANGLE) {
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y)

        } else if (this.tool == SENSOR) {
            let distance = findDistance(this.startPos, this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false)
        }

        else if (this.tool == PARKING) {

            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineTo(this.startPos.x, this.currentPos.y + 50)
            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineTo(this.currentPos.x - 25, this.startPos.y)
            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineTo(this.currentPos.x + 25, this.startPos.y)

        }


        this.context.stroke()

    }

    drawFreeLine(lineWidth) {
        this.context.lineWidth = lineWidth
        this.context.lineTo(this.currentPos.x, this.currentPos.y)
        this.context.stroke()
    }


    undoPaint() {
        if (this.undoStack.length > 0) {
            this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
            this.undoStack.pop();
        } else {
            alert("No undo available");
        }
    }
}
