const triangle = (size, origin, [ox,oy] = origin, x = size*.6,y = size*.5) => [
    [ox, oy - y],[ox - x, oy + y], [ox+ x, oy + y]
]
const rotate = (
    origin,
    pointRelativeToOrigin, 
    [ox,oy] = origin,
    px = pointRelativeToOrigin[0]-ox,
    py = pointRelativeToOrigin[1]-oy,
    newX = px*Math.cos(.01)  - py*Math.sin(.01),
    newY = px*Math.sin(.01)  + py*Math.cos(.01),
) => Object.freeze([newX+ox, newY+oy])  

const Vector2LenSqr = ([x,y]) => (x * x + y * y)
const Vector2Len = vec =>  Math.sqrt(Vector2LenSqr(vec))
const centerOfTriangle = (triangle) => {
    const xs = triangle.map(x => x[0]).reduce((a,b)=> a + b) / 3
    const ys = triangle.map(y => y[1]).reduce((a,b) => a + b) / 3
    return [xs,ys]
}
