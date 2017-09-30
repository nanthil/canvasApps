const draw = (context) => ({
    drawLine: function([fx,fy], [tx,ty]) {
        context.beginPath()
        context.moveTo(fx,fy)
        context.lineTo(tx,ty)
        context.stroke()
        context.closePath()
    },
    drawPoint: function([x,y]){
        context.beginPath()
        context.fillRect(x,y,5,5)
        context.stroke()
        context.closePath()
    }

})