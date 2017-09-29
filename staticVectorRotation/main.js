(main = (
        std,canvas,context = canvas.getContext('2d'),
        stdlib = {
            mathOps: std.mathOps(), 
            arrayMethods: std.arrayMethods(),
            object: std.object(),
        },
        corelib ={
            ...stdlib,
            origin: Object.freeze([canvas.width/2,canvas.height/2]),
            vectorlib: vectorlib(stdlib),
            canvas,context

        },

        applib = {
            ...corelib,
            draw: draw(corelib)(),
            graph: graph(corelib)
        }
    ) => (
        appstart(applib)
    ))
