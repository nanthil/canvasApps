function drawLine(context, [fx,fy], [tx,ty], settings){
        context.beginPath()
        context.moveTo(fx,fy)
        context.lineTo(tx,ty)
        context.lineWidth = settings.width
        context.stroke()
        context.closePath()
}
function drawWorld(world, context) {
    console.log(world)
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
        const [[fx,fy], [tx,ty]] = line,
              //points relative to the player
              [[nfx, nfy], [ntx,nty]]= [
                [fx - px, fy - py],
                [tx - px, ty - py]
              ],
              //rotating points relative to the player
              rz1 = nfx * Math.cos(a) + nfy * Math.sin(a),
              rz2 = ntx * Math.cos(a) + nty * Math.sin(a)
              rx1 = nfx * Math.sin(a) - nfy * Math.cos(a),
              rx2 = ntx * Math.sin(a) - nty * Math.cos(a)
        //the new points from which to draw a line
        const drawFrom = [p2x - rx1, p2y - rz1],
              drawTo   = [p2x - rx2, p2y - rz2]
        drawLine(context, drawFrom, drawTo, {width:1})
    })
}

function drawPlayer2([x,y,a],context){
    drawPlayer([x,y,a],context)

}