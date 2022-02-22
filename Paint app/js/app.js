import { LINE, PARKING, RECTANGLE, SENSOR, BRUSH, PAINT, ERASER } from './tool.js'

import Paint from './paint.class.js'

var paint = new Paint("canvas")
paint.activeTool = LINE
paint.lineWidth = 1
paint.selectedColor = "#000000"
paint.init()



document.querySelectorAll("[data-command]").forEach(
    item => {

        item.addEventListener("click", e => {
            
            let command = item.getAttribute("data-command")
            
            if (command === 'undo') {
                paint.undoPaint()
            }
            else if (command === "download") {
                let canvas = document.getElementById("canvas")
                let image = canvas.toDataURL("image/png", 1.0)
                    .replace("image/png", "image/octet-stream")
                let link = document.createElement("a")
                link.download = "my-image.png"
                link.href = image
                link.click()
            }
            else if (command === "newfile") {
                location.reload()
            }
           
            else if (command === "grid") {
                
                let canvas = document.getElementById("canvas")

                let context1 = canvas.getContext('2d');
                
                for (let x = 1; x < 1024; x += 10) {
                    context1.moveTo(x, 0);
                    context1.lineTo(x, 720);
                }

                for (let y = 1; y < 720; y += 10) {
                    context1.moveTo(0, y);
                    context1.lineTo(1024, y);
                }
                
                context1.strokeStyle = "#ddd";
                context1.stroke();
                gridValue = true;
                
            }


            console.log(item.getAttribute('data-command'))
            
        })
    }
)

document.querySelectorAll("[data-tool]").forEach(
    item => {

        item.addEventListener("click", e => {

            document.querySelector("[data-tool].active").classList.toggle("active")
            item.classList.toggle("active")

            let selectedTool = item.getAttribute("data-tool")
            paint.activeTool = selectedTool


            switch (selectedTool) {
                case LINE:
                case PARKING:
                case RECTANGLE:

                    document.querySelector(".group.for-shapes").style.display = "block"

                    break;

                case BRUSH:
                case ERASER:
                    document.querySelector(".group.for-shapes").style.display = "block"


                case SENSOR:
                    document.querySelector(".group.for-shapes").style.display = "block"

                    break;
                default:
                    document.querySelector(".group.for-shapes").style.display = "none"


            }

        })
    }
)


document.querySelectorAll("[data-line-width]").forEach(
    item => {

        item.addEventListener("click", e => {

            document.querySelector("[data-line-width].active").classList.toggle("active")

            item.classList.toggle("active")

            let linewidth = item.getAttribute("data-line-width")
            paint.lineWidth = linewidth



        })
    }
)


document.querySelectorAll("[data-color]").forEach(
    item => {

        item.addEventListener("click", e => {

            document.querySelector("[data-color].active").classList.toggle("active")

            item.classList.toggle("active")


            let color = item.getAttribute("data-color")
            paint.selectedColor = color
        })
    }
)
