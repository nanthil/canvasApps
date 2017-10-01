const main = () => {
    const instance = new state(() => console.log())

    const drawing = draw(instance.context)

    // shape(13)(100, instance.origin).forEach(
    //     (x,i,a) => i === a.length -1? drawing.drawLine(x, a[0]) :drawing.drawLine(x,a[i+1]))
    const loop = (instance) => (
    ) => {
        center = centerOfShape(instance.shape)
        instance.update()
        instance.frame++
        if(instance.frame === 100) {
            instance.frame = 0
            instance.sides++
            instance.shape= shape(instance.sides)(100, center)
        }


        drawing.drawPoint(center)
        instance.shape = instance.shape.map(x => rotate(center,x))
        instance.shape.forEach(
            (x,i,a) => i === a.length -1 ? drawing.drawLine(x, a[0]) :drawing.drawLine(x,a[i+1]))

        requestAnimationFrame(loop(instance))
    }
    loop(instance)()
}
