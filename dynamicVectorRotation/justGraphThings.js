
//tick marks for graph
//ticks options, used to collect lines for drawing
let drawTicks = (canvas, x, y, direction, ticks) => {
  if(ticks === undefined) ticks = [];
  if(direction === 'y' && y < canvas.height){
    let name = direction + ticks.length;
    let line = lineObject([x + 5, y],[x - 5, y])
    ticks.push({
      [name]: {
        from: line.from,
        to: line.to,
        color: 'black'
      }
    });
    drawTicks(canvas,x,y+10,direction, ticks);
  } else if(direction === 'x' && x < canvas.width){
    let name = direction + ticks.length;
    let line = lineObject([x, y + 5],[x, y - 5])
    ticks.push({
      [name]: {
        from: line.from,
        to: line.to,
        color: 'black'
      }
    })
    drawTicks(canvas,x+10, y, direction, ticks);
  }
  return flattenArrayToObject(ticks);
}

//draw 2d graph
let initGraph = (origin) => {
  let x = lineObject([origin.x, 0],[origin.x, canvas.height]);
  let y = lineObject([0, origin.y],[canvas.width, origin.y]);
  return {
    x:{
      from: x.from,
      to: x.to,
      ticks:cartesian2dCoordinate(0, origin.y)
    }, y: {
      from: y.from,
      to: y.to,
      ticks: cartesian2dCoordinate(origin.x,0)
    }
  }
}

//plot points on graph
let plotPoints = (origin, points, ctx)=>{
  points.map((point) => {
    let scaled = relativePoint(origin,
          cartesian2dCoordinate(scale(point.x), scale(point.y)));

    drawLine(scaled, cartesian2dCoordinate(origin.x, scaled.y), ctx);
    drawLine(scaled, cartesian2dCoordinate(scaled.x, origin.y), ctx);
    drawPoint(point, scaled, ctx);
  });
}
