(appstart = 
    (stdlib, vectorlib) => (
        { mathOps, object, arrayMethods } = stdlib,
        { pfhorEach,redeuce } = arrayMethods(),
        { range, isDivisibleBy } = mathOps(),
        { Vector2 } = vectorlib.twoD(),
        oneTo100 = range(1,101),

        v2 = Vector2(1,2)
    )
)