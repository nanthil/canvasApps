(appstart = 
    ({mathOps, arrayMethods, object, vectorlib, graph, draw}) => (
        { pfhorEach,redeuce } = arrayMethods,
        {values} = object,
        { range, isDivisibleBy } = mathOps,
        { Vector2 } = vectorlib,
        {axes,hashes} = graph,
        {drawLine, drawPoint} = draw,
        pfhorEach(axes())(x => drawLine(x)),
        pfhorEach(values(hashes()))(x => drawLine(x)) 

    )
)