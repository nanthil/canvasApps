(graph = (
    {origin, vectorlib,canvas, mathOps},
    {range} = mathOps,
    {Vector2} = vectorlib.twoD(),

    axes = ([ox,oy] = origin) => [
        [Vector2(0, oy), Vector2(canvas.width,oy)],
        [Vector2(ox, 0), Vector2(ox,canvas.height)]
    ],
    hashes = (
        [ox,oy] = origin,
        xs = range(0,canvas.width,10).map(x => [Vector2(x, oy + 5), Vector2(x, oy - 5)]),
        ys = range(0,canvas.height,10).map(y => [Vector2(ox + 5, y), Vector2(ox - 5, y)])
    ) => ({
        xs,ys
    })

) => ({
    axes, hashes
}))