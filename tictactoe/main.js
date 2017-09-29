const getCanvas = () => document.getElementById('canvas')

let boardState = []
let tiles = [...Array(9).keys()]

const main = (canvas,context,forDrawing) => {
    drawtictactoeboard(forDrawing)
    initTiles(forDrawing)
}

const mouseClick = (canvas,context) => (
    eve,
    rect = canvas.getBoundingClientRect()
) => drawXorO([eve.clientX - rect.left, eve.clientY - rect.top], canvas, context)

const drawXorO = (mousePos,canvas,context) => {
    if(boardState.length % 2 === 0) tiles.forEach(x => x.drawX(context, mousePos))
    else tiles.forEach(x => x.drawO(context, mousePos))
    boardState.push('new')
}

const mouseMove = (canvas,context, forDrawing) => 
    (eve,rect = canvas.getBoundingClientRect()) => highlightRect([eve.clientX - rect.left, eve.clientY - rect.top], canvas,forDrawing)

const highlightRect = (mousePos, canvas, forDrawing,
    {width, height, thirdx, sixthx, thirdy, sixthy,context} = forDrawing) => {

    const states =   tiles.map(x => x.state)
    const cols   = [0,3,6].map(x => states.slice(x, x+3))
    const rows   = [0,1,2].map(x => cols.map(y => y[x]))
    const diags  =   [0,2].map(x => x === 0 ? cols.map(y => y[x++]) : cols.map(y => y[x--]));

    [...cols, ...rows,...diags].forEach(x => 
        x.every(v => v!== undefined && v === x[0]) 
        ? console.log(x[0] + ' wins!')
        : false
    )
    const drawState= () => {
        context.clearRect(0,0,canvas.width, canvas.height)
        drawtictactoeboard(forDrawing)
        tiles.forEach(x => {
            if(x.state === 'x') x.drawX(context,[-1,0])
            if(x.state === 'o') x.drawO(context,[-1,0])
            x.fill(context,mousePos)
        })
    }
    drawState()
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
const initTiles = (
    {width, height, thirdx, sixthx, thirdy, sixthy,context},
    locationx = 0,locationy = 0
) => {
    const newTile = (size, location) => new tile(undefined, size,location)
    tiles = tiles.map((x,i) => {
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

class tile{
    
    constructor (state, size, location) {
        this.state = state
        this.size = size
        this.location = location
    }
    mouseOver([x,y], [lx,ly],[sx,sy]){
        return (x > lx) && 
               (y > ly) &&
               (x < (lx + sx)) && 
               (y < (ly + sy))
    }     
    drawX(context, mousePos, [lx,ly] = this.location, [sx,sy] = this.size){
        if (this.mouseOver(mousePos, this.location,this.size)|| this.state === 'x'){
            this.state = 'x'
            context.moveTo(lx,ly)
            context.lineTo(lx + sx,ly + sy)
            context.moveTo(lx,ly + sy)
            context.lineTo(lx + sx,ly)
            context.stroke()
        }
    }
    drawO(context, mousePos, [lx,ly] = this.location, [sx,sy] = this.size){
        if (this.mouseOver(mousePos,this.location,this.size) || this.state === 'o'){
            this.state = 'o'
            context.beginPath();
            context.arc(lx+ sx/2, ly+sy/2, 40, 0, 2 * Math.PI, false);
            context.stroke();
        }
    }
    fill(context, mousePos, [lx,ly] = this.location, [sx,sy] = this.size){
        if (this.mouseOver(mousePos, this.location, this.size)) context.fillRect(lx,ly,sx,sy)
    }
}

const third = x => x * .33
const sixth = x => x * .66