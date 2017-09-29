//game loop is based on the mousemove event that is is added to canvas in tictactoe.html
const gameLoop = (mousePos, canvas, tiles,forDrawing,
    {width, height, thirdx, sixthx, thirdy, sixthy,context} = forDrawing) => {
    //this should fire on after the mouse is clicked to see if the winner is declared, not during the main loop
    console.log(checkWinConditions(tiles))
    drawState(context,tiles,canvas,mousePos,forDrawing)
}
const checkWinConditions = (tiles) => {
    const states =   tiles.map(x => x.state)
    const cols   = [0,3,6].map(x => states.slice(x, x+3))
    const rows   = [0,1,2].map(x => cols.map(y => y[x]))
    const diags  =   [0,2].map(x => x === 0 ? cols.map(y => y[x++]) : cols.map(y => y[x--]));

    return [...cols, ...rows,...diags].filter(x => 
        x.every(v => v!== undefined && v === x[0]) 
        ? true
        : false
    )
}

//this should be part of the state machine. state should be encapsulated and have a draw function
const drawState= (context,tiles,canvas,mousePos,forDrawing) => {
    context.clearRect(0,0,canvas.width, canvas.height)
    drawtictactoeboard(forDrawing)
    tiles.forEach(x => {
        if(x.state === 'x') x.drawX(context,[-1,0])
        if(x.state === 'o') x.drawO(context,[-1,0])
        x.fill(context,mousePos)
    })
}
//refactor as the startNewGame function
const startNewGame = (canvas,context,forDrawing) => {
    drawtictactoeboard(forDrawing)
    return initTiles(forDrawing)
}
const initTiles = (
    {width, height, thirdx, sixthx, thirdy, sixthy,context},
    locationx = 0,locationy = 0,
    arrayOfTiles = [...Array(9).keys()],
    newTile = (size, location) => new tile(undefined, size,location)
) => {
    return arrayOfTiles.map((x,i) => {
        if(i===0)
            return newTile([thirdx,thirdy],[locationx,locationy])
        else if(i % 3 === 0){
            locationx += thirdx
            locationy = 0
        }
        else 
            locationy += thirdy
        return newTile([thirdx,thirdy],[locationx,locationy])
    })
}

//move to mouse events file
const mouseClick = (canvas,context,tiles) => (
    eve,
    rect = canvas.getBoundingClientRect()
) => drawXorO([eve.clientX - rect.left, eve.clientY - rect.top], canvas, context,tiles)

const mouseMove = (canvas,context, tiles,forDrawing) => 
    (eve,rect = canvas.getBoundingClientRect()) => 
        gameLoop([eve.clientX - rect.left, eve.clientY - rect.top], canvas,tiles,forDrawing)

const drawXorO = (mousePos,canvas,context,tiles) => {
    if(whosTurn.length % 2 === 0) tiles.forEach(x => x.drawX(context, mousePos))
    else tiles.forEach(x => x.drawO(context, mousePos))
    whosTurn.push('new')
}




const drawtictactoeboard = (
    {width, height, thirdx, sixthx, thirdy, sixthy,context}
) => {
    context.moveTo(thirdx, 0)
    context.lineTo(thirdx, height)
    context.moveTo(sixthx, 0)
    context.lineTo(sixthx, height)

    context.moveTo(0,thirdy)
    context.lineTo(width, thirdy)
    context.moveTo(0,sixthy)
    context.lineTo(width, sixthy)
    context.stroke()
}



const third = x => x * .33
const sixth = x => x * .66