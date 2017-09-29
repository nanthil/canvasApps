
//i need a functional lesson...
//if you look at justDraw/justGraph-things'.js, they appear to be stacks of commands
//is there a way to create functional graphical apis?
//do functional graphical apis already exist? How does it work?
//how would one work if it doesn't exist already?
//in my mind I would think that the thing that I'm drawing would exist in data somewhere, and that would be the return value from drawing something.
//in the main loop, you would recurse, events would fire, and values would be returned from events, passing changed values for the draw method to render
//is this something that can be done?
//for example: (pseudocode)
//
//let blocks = [b1,b2,b3]
//draw(blocks):
//  --do something with the graphics
//  --such as a 3d rotate
//  let newState = blocks.map(b=>rotate(b));
//
//  if(event): newState.push(newBlock)
//  if(notEOF): draw(newState);
//  else
//Can someone splain me plz?

let main = () => {
  //INIT
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        //center of the canvas
        let origin = (cartesian2dCoordinate(canvas.width/2, canvas.height/2));
        let events = [];

        let startState = testData(origin);
        let restartState;


        //if you add more object types, add the type to the if statement below
        let godObjects = ['graph',
                  'surroundVectors',
                  'vectorsFromOrigin'];

  let mainDraw = (o, d) => {
    try{
        Object.keys(o).map((ob) =>{
        //Objects that are lines. Recurse on lineobject.object
        if(godObjects.some(x => x === ob)){
          mainDraw(o[ob])
        } else{
          //#1. Draw A Line
          drawLine(o[ob].from, o[ob].to, ctx, o[ob].color);
          //#2. Check for ticks. If tickes, go back to #1.
          if(o[ob].ticks !== undefined) {
            let axis = d === undefined ? ob:d;
            let t = drawTicks(canvas, o[ob].ticks.x, o[ob].ticks.y, axis);
            mainDraw(t);
          }
          //#3. Draw points! If you would like to display a point, return an object with the point property
          if(o[ob].point !== undefined) drawPoint(o[ob].point[0], o[ob].point[1], ctx);
        }
      });
    } catch(e){
      return "Error drawing lines. Experienced the following error: ", e;
    }
  }


  let mainLoop = (state, stateObj) => {
    //clear before every draw
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.beginPath();

    //return and handle errors from drawing
        let error = mainDraw(state)
        if(error !== undefined){
          console.log(error);
        }
    //generate new state
        let rotatedVectors = rotateVectors(state.vectorsFromOrigin);
        let newState = testData(origin, rotatedVectors);
    //avoid stack overflow with recursion
        setTimeout(()=> {
          if(events.length <= 0){
            mainLoop(newState)
          } else {
            rotateVectors(state.vectorsFromOrigin, true);
            restartState = newState;
          }
        }, .5);
  }

  //start main loop
  mainLoop(startState);

  document.getElementById("stop").addEventListener("click", function(e){
    events.push(e);
  });
  document.getElementById("start").addEventListener("click", function(e){
    if(events.length > 0) {
      events = [];
      //console.clear();
      mainLoop(restartState);
    }
  });
}
