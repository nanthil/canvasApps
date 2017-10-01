const rotate = (
    origin,
    pointRelativeToOrigin, 
    rate = .01,
    [ox,oy] = origin,
    px = pointRelativeToOrigin[0]-ox,
    py = pointRelativeToOrigin[1]-oy,
    newX = px*Math.cos(rate)  - py*Math.sin(rate),
    newY = px*Math.sin(rate)  + py*Math.cos(rate),
) => Object.freeze([newX+ox, newY+oy])  

const Vector2LenSqr = ([x,y]) => (x * x + y * y)
const Vector2Len = vec =>  Math.sqrt(Vector2LenSqr(vec))
const centerOfTriangle = (triangle) => {
    const xs = triangle.map(x => x[0]).reduce((a,b)=> a + b) / 3
    const ys = triangle.map(y => y[1]).reduce((a,b) => a + b) / 3
    return [xs,ys]
}
const centerOfShape = shape => {
    const xs = shape.map(x => x[0]).reduce((a,b) => a + b) / shape.length
    const ys = shape.map(y => y[1]).reduce((a,b) => a + b) / shape.length
    return [xs,ys]
}
const shape = sides => (size,origin,[ox,oy]=origin) => {
    const space = 360/sides* (Math.PI/180)
    const genSides = [...Array(sides).keys()]
    let start = [ox,oy + size]
    for(let i = 0; i < genSides.length; i++){
        if(i===0) genSides[0] = start
        else genSides[i] = rotate(origin, genSides[i-1], space)
    }
    return genSides
}
