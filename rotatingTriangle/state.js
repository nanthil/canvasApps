class state{
    constructor(fn) {
        this.update  = this.curryDraw(fn)
        this.input   = new inputs()
        this.canvas  = document.getElementById('canvas')
        this.context = canvas.getContext('2d') 
        this.width   = this.canvas.width
        this.height  = this.canvas.height
        this.origin  = Object.freeze([this.width/2, this.height/2])
        this.frame = 0
        this.sides = 3
        this.shape = shape(this.sides)(100, this.origin)
        this.canvas.addEventListener('keydown',(e) => 
            this.shape = this.input.handle(e.keyCode,this)
        )
    }
    curryDraw(fn){
        const self = this
        return function(){
            self.context.clearRect(0,0, this.width, this.height)
            fn(self)
        }
    }
}