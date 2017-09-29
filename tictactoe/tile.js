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