let inputEvents = []
let worldEvents = []
function State(canvas) {
    this.registerEventHandlers(canvas)

    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.world = [
        [
            [70, 20], [70, 70]
        ]
    ]
    this.player = [50,50,0] //x,y, angle

    return this
}
State.prototype.draw = function(world, player, objects) {
    drawWorld(world, this.context)
    drawPlayer(player, this.context)

}

State.prototype.loop = function(state) {
    return () => {
        state.context.clearRect(0,0,state.canvas.width, state.canvas.height)
        state.movePlayer(state)
        state.draw(state.world, state.player)
        requestAnimationFrame(state.loop(state))
    }
}

State.prototype.movePlayer = function(state) {
    if(inputEvents.length <= 0) return
    inputEvents.forEach(event => {
        state.player = event in inputs ? (inputs[event](state.player)) : state.player
    })
}
State.prototype.registerEventHandlers = function(canvas){
    canvas.addEventListener('keydown',(e) => {
        if(inputEvents.includes(e.key)) return
        inputEvents.push(e.key)
    })
    canvas.addEventListener('keyup',(e) => {
        let i = inputEvents.indexOf(e.key)
        inputEvents.splice(i,1)

    })
}