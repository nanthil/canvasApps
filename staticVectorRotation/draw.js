(draw = ({context}) => (

    drawLine = ([[fx,fy], [tx,ty]]) => (
        context.beginPath(),
        context.moveTo(fx,fy),
        context.lineTo(tx,ty),
        // context.strokeStyle = (color !== undefined) ? color: "black",
        context.lineWidth = 3,
        context.stroke(),
        context.closePath()
    ),
    drawPoint = ([x,y]) => ( 
        context.beginPath(),
        context.fillRect(x, y, -3, -3),
        context.fillRect(x, y, 3, -3),
        context.fillRect(x, y, -3, 3),
        context.fillRect(x, y, 3, 3),
        context.lineWidth = 1,
        context.closePath()
    )

) => ({
    drawLine, drawPoint
}))