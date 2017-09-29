
//draw scale, use this to modify values so they match to the scale
let scale = (num) => {
  return num * 10;
}
let lineObject= (from, to)=>{
  return {
    from: cartesian2dCoordinate(from[0], from[1]),
    to: cartesian2dCoordinate(to[0], to[1])
  }
}

//maps points around all vectors in given array
let calcLinesAroundVectors = (vectors, origin) => {
  return flattenArrayToObject(vectors.map((v, i, arr) => {
    let name = 'vector' + i;
    //connect line to next vector
    if(i+1 < arr.length) {
      return {
        [name]: {
            from: relativePoint(origin, calcVectorCoordinates(v)),
            to: relativePoint(origin, calcVectorCoordinates(arr[i+1])),
            color: 'red'
          }
        };
    } else {
      return {
        [name]: {
          from: relativePoint(origin, calcVectorCoordinates(v)),
          to: relativePoint(origin, calcVectorCoordinates(arr[0])),
          color: 'red'
        }
      };
    }
  }));
  //compress list
}

//sort vectors by degrees
let sortVectors = (vectors) => {
  return vectors.sort((a,b)=> {
    return b.degrees - a.degrees;
  })
}

//allows you to set from where the points of vectors will be referenced before drawing a line
let relativePoint = (origin, p) => {
  return cartesian2dCoordinate(origin.x + p.x, origin.y + p.y);
}

//find physical location of vectors
//usually used when finding the relative point of the vectors
let calcVectorCoordinates = (v) =>{
  return cartesian2dCoordinate((scale(v.magnitude)) *  Math.cos(v.direction), (scale(v.magnitude)) * Math.sin(v.direction));
}

let calcVectorsFromOrigin = (vectors, origin, ctx) => {
  return flattenArrayToObject(vectors.map((v,i) => {
    let name = 'vector' + i;
    let endV = relativePoint(origin, calcVectorCoordinates(v));
    return {
      [name]:{
        vector: v,
        from: origin,
        to: endV,
        point: [v.coords, endV],
        color: 'green'
      }
    }
  }));
}


//where p is the unscaled point, and scaled is the scaled points, relative to origin
let drawPoint = (p, scaled, ctx) => {
  ctx.beginPath();
  ctx.fillRect(scaled.x, scaled.y, -3, -3);
  ctx.fillRect(scaled.x, scaled.y, 3, -3);
  ctx.fillRect(scaled.x, scaled.y, -3, 3);
  ctx.fillRect(scaled.x, scaled.y, 3, 3);
  ctx.lineWidth = 1;
  if(p !== undefined){
    ctx.strokeText('(' + p.x + ', ' + p.y + ')', scaled.x + 10, scaled.y + 10);
    ctx.closePath();
  }
}

//draws a line from point to point
let drawLine = (from, to, ctx, color) =>{
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = (color !== undefined) ? color: "black";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
}


//helpers
let flattenArrayToObject = (a) => {
  return Object.assign(...a);
}
