function drawLine(context, [fx,fy], [tx,ty], settings){
        context.beginPath()
        context.moveTo(fx,fy)
        context.lineTo(tx,ty)
        context.lineWidth = settings.width
        context.strokeStyle = settings.color || 'black'
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
        const [rz1,rz2,rx1,rx2] = transform(line,player)
        
        const drawFrom = [p2x - rx1, p2y - rz1],
              drawTo   = [p2x - rx2, p2y - rz2]
        drawLine(context, drawFrom, drawTo, {width:1})
    })
}
function transform(line, [px,py,a]) {
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
    return [rz1,rz2,rx1,rx2]
}

function drawWorld3(world, context, player){
    const colors = ['yellow','green','purple','orange']
    world.forEach((line,i) => {
        let [rz1,rz2,rx1,rx2] = transform(line, player)
        if(rz1 > 0 || rz2 > 0){
            const [ix1,iz1] = intersect(rx1,rz1,rx2,rz2,-0.0001,0.0001,-20,5)
            const [ix2,iz2] = intersect(rx1,rz1,rx2,rz2, 0.0001,0.0001, 20,5)
            if(rz1 <=0) [rx1, rz1] = 
                iz1 > 0
                ? [ix1,iz1]
                : [ix2,iz2]

            if(rz2 <= 0) [rx2,rz2] 
                = iz1 > 0
                ? [ix1,iz1]
                : [ix2, iz2]

            const x1  = -rx1 * 16 / rz1,
                  y1a =       -50 / rz1,
                  y1b =        50 / rz1,
                  x2  = -rx2 * 16 / rz2,
                  y2a =       -50 / rz2,
                  y2b =        50 / rz2
            for(x= x1; x > x2; x-=3){
                ya = y1a + (x - x1) * (y2a - y1a) / (x2 - x1)
                yb = y1b + (x - x1) * (y2b - y1b) / (x2 - x1)
                drawLine(context,[100+x,0],[100+x,100+ -ya],{width:4,color:'gray'})
                drawLine(context,[100+x,100+yb],[100+x,140],{width:4,color:'blue'})
                drawLine(context,[100+x,100+ya],[100+x,100+yb],{width:4,color:colors[i%4]})
            }
            drawLine(context,[100+x1,100+y1a],[100+x1,100+y1b],{width:1})
            drawLine(context,[100+x2,100+y2a],[100+x2,100+y2b],{width:1})
            // drawLine(context,[100+x1,100+y1a],[100+x1,100+y1b],{width:1})
            // drawLine(context,[100+x2,100+y2a],[100+x2,100+y2b],{width:1})
        }
    })
}

const fnCross = (x1,y1,x2,y2) => x1*y2 - x2*y1
const intersect = (x1,y1,x2,y2,x3,y3,x4,y4,x,y) =>{
    x = fnCross(x1,y1,x2,y2)
    y = fnCross(x3,y3,x4,y4)
    det = fnCross(x1-x2,y1-y2,x3-x4,y3-y4)
    x = fnCross(x,x1-x2,y,x3-x4) / det
    y = fnCross(x, y1-y2,y,y3-y4)/det
    return [x,y]
}