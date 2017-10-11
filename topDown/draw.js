function drawWorld(world, context) {
    world.forEach(line => {
        context.beginPath()
        const [from, to] = line,
              [fx, fy] = from, 
              [tx,ty] = to
        context.moveTo(fx,fy)
        context.lineTo(tx,ty)
        context.lineWidth = 1
        context.stroke()
        context.closePath()
    })

}
function drawPlayer([x,y,a], context){
    context.beginPath()
    context.moveTo(x,y)
    context.lineTo((Math.cos(a) * 10) + x,(Math.sin(a)*10) + y)
    context.lineWidth = 1
    context.stroke()
    context.fillRect(x,y,3, 3)
    context.closePath()
}