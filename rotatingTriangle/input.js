class inputs {
    constructor() {
        this.direction = new directions()
        this.keys = {
            38: this.direction.up,
            40: this.direction.down,
            37: this.direction.left,
            39: this.direction.right
        }
        console.log(this.direction)
    }
    handle(input,instance) {
        return input >36 && input < 41
        ?instance.triangles.map(this.keys[input.toString()])
        :instance.triangles
    }
}
calc= (val, arr) => arr.reduce((a,b) => a + b) + val
class directions {
    up([x,y]) {
        return [calc(x,[0,0]), calc(y, [0,-1])]
    }
    down([x,y]){
        return [calc(x,[0,0]), calc(y, [0,1])]
    }
    left([x,y]){
        return [calc(x,[-1,0]), calc(y, [0,0])]        
    }
    right([x,y]){
        return [calc(x,[1,0]), calc(y, [0,0])]        
    }
}
