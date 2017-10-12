let inputEvents = []
let worldEvents = []

function State(canvas) {
    this.registerEventHandlers(canvas, canvas2)

    //world centric camera
    this.canvas   = canvas
    this.context  = canvas.getContext('2d')

    //player centric camera
    this.canvas2  = canvas2
    this.context2 = canvas2.getContext('2d')

    //player 1 moves in the world, player 2's world revolves around him
    this.player   = [this.canvas.width/2,this.canvas.height/2,180] //player: [x,y], angle
    this.player2  = [this.canvas.width/2,this.canvas.height/2,4.65]

    this.world = [
        [[100, 0], [100, 100]],
        [[100,100], [175,100]],
        [[175, 100], [175, 1]],
        [[175, 1], [100,0]]
    ]

    return this
}

State.prototype.draw = function(world, player, p2) {
    drawWorld(world, this.context)
    drawPlayer(player, this.context)

    drawWorld2(world, this.context2, player, p2)
    drawPlayer(p2, this.context2)
}

State.prototype.loop = function(state) {
    return () => {
        state.context.clearRect(0,0,state.canvas.width, state.canvas.height)
        state.context2.clearRect(0,0,state.canvas.width, state.canvas.height)
        state.movePlayer(state)
        state.draw(state.world, state.player, state.player2)
        requestAnimationFrame(state.loop(state))
    }
}

State.prototype.movePlayer = function(state) {
    if(inputEvents.length <= 0) return
    // if(state.playerCollision(state)) return

    inputEvents.forEach(event => {
        state.player = event in inputs ? (inputs[event](state.player)) : state.player
    })
}

//change to if it WOULD cross the threshold instead, and calcuate the intersection of lines
State.prototype.playerCollision = function(stte) {
    const [px,py] = state.player
    return state.world.filter(line => {
        const [[fx, fy], [tx,ty]] = [from,to] = line,
              slope = (ty - fy) / (tx - fx),
              yIntersect = -slope * fx + fy,
              result = slope * px + yIntersect
        return (py.toFixed(0) -1< result.toFixed(0) && py.toFixed(0) +1 > result.toFixed(0))
    }).length > 0
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