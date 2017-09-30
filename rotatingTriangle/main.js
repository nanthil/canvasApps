const main = () => {
    const instance = new state(() => console.log())

    const drawing = draw(instance.context)
    const loop = (instance) => (
    ) => {
        instance.update()
        center = centerOfTriangle(instance.triangles)
        drawing.drawPoint(center)
        instance.triangles = instance.triangles.map(x => rotate(center,x))
        instance.triangles.forEach((x,i,a) => i === 2 ? drawing.drawLine(x, a[0]) :drawing.drawLine(x,a[i+1]))

        requestAnimationFrame(loop(instance))
    }
    loop(instance)()
}
