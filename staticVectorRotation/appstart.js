(appstart = 
    ({mathOps, arrayMethods, object, vectorlib, graph, draw, origin,y, canvas, context}) => (
        { Vector2, Vector2Add, Vector2Sub,rotate } = vectorlib.twoD(),
        { pfhorEach,redeuce,mapfh} = arrayMethods,
        { range, isDivisibleBy } = mathOps,
        {using, functions,youCan} = y,
        {drawLine, drawPoint} = draw,
        {axes,hashes} = graph,
        { values } = object,


        points = 
        mapfh(
            mapfh(points = [[2,3], [-5,-8], [3,-7], [-6, 1], [2, -7], [-6,-7],[-2, -4],[-1,-12], [3,-2]])
                (([x,y]) => Vector2(x* 10,y * 10)))
            (p => Vector2Add(origin, p)),


        loop = fn =>points=>(
            clearCanvas = context.clearRect(0,0,canvas.width, canvas.height),
            drawEachAxis = pfhorEach(axes())(axis => drawLine(axis)),
            drawLineForEachHashOnEachPlane = pfhorEach(values(hashes()))(plane => pfhorEach(plane)(hash => drawLine(hash))),
            drawThePointAtTheEndOfEachLine = pfhorEach(points)(p => (drawLine([origin,p], drawPoint(p)))),
            rotatedPointsAroundOrigin = mapfh(mapfh(points)(p => rotate(Vector2Sub(p,origin))))(p => Vector2Add(origin,p)),
            refreshRate = setTimeout(() => fn(rotatedPointsAroundOrigin), 10)
        ),
        loopy = youCan(loop),
        using(loopy)(loopy)(points)
    )
)