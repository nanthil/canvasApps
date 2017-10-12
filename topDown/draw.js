function drawLine(context, [fx,fy], [tx,ty], settings){
        context.beginPath()
        context.moveTo(fx,fy)
        context.lineTo(tx,ty)
        context.lineWidth = settings.width
        context.stroke()
        context.closePath()
}

function drawWorld(world, context) {
    world.forEach(line => {
        const [from, to] = line
        drawLine(context, from, to, {width: 1})
    })
}

function drawPlayer([x,y,a], context){
    const nx = x + (Math.cos(a) * 10),
          ny = y + (Math.sin(a) * 10)
    drawLine(context, [x,y], [nx,ny], {width:1})

    context.fillRect(x,y,3, 3)
    context.closePath()
}

function drawWorld2(world, context, player,[p2x,p2y]){
    const [px,py,a] = player
    world.forEach(line => {
        const [[fx,fy], [tx,ty]] = [from,to] = line,
              //points relative to the player in the world, but not relative to the player camera at origin
              [[relativeFx, relativeFy], [relativeTx,relativeTy]] = [
                [fx - px, fy - py],
                [tx - px, ty - py]
              ],
              rz1 = relativeFx * Math.cos(a) + relativeFy * Math.sin(a),
              rz2 = relativeTx * Math.cos(a) + relativeTy * Math.sin(a)
              rx1 = relativeFx * Math.sin(a) - relativeFy * Math.cos(a),
              rx2 = relativeTx * Math.sin(a) - relativeTy * Math.cos(a)

        //snap to origin
        const drawFrom = [p2x - rx1, p2y - rz1],
              drawTo   = [p2x - rx2, p2y - rz2]
        drawLine(context, drawFrom, drawTo, {width:1})
    })
}
