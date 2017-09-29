
let cartesian2dCoordinate = (x,y) =>{
  return {x:x, y:y}
}

//just vector things
let vector = (c, color) => {
  let dir = vectorDirection(c);
  let deg = toDegrees(dir);
  return {
    coords: c,
    magnitude: vectorMagnitute(c),
    direction: dir,
    degrees: deg > 0 ? deg : deg + 360,
    color: 'red'
  }
}
//calculate direction where a and b are 2d points
let vectorFromAtoB = (p1,p2) =>{
  return vector(cartesian2dCoordinate(p2.x - p1.x, p2.y - p1.y));
}
let add2dVectors = (v1,v2) => {
  return vector(cartesian2dCoordinate(v1.coords.x *-1+ v2.coords.x, v1.coords.y *-1+ v2.coords.y));
}
let subVectorAfromB = (a,b) => {
  return vector(cartesian2dCoordinate(b.coords.x + (a.coords.x * - 1), b.coords.y + (a.coords.y * -1)));
}

//where c is a 2d coordinate
let vectorMagnitute = (c) => {
  return Math.abs(Math.sqrt(square(c.x) + square(c.y)));
}

//returns degrees
let vectorDirection = (c) => {
  if(c.x === 0 && c.y === 0) return undefined;
  else return Math.atan2(-1*c.y,c.x);
}


let genVectorsFromListOfPoints = (points, i, vectors) => {
  if(vectors === undefined) vectors = [];
  if(points[i+1] !== undefined) {
    vectors.push(vectorFromAtoB(points[i], points[i+1]));
    genVectorsFromListOfPoints(points, i + 1, vectors);
  }
  return vectors;
}
//math helpers
//https://www.mathsisfun.com/geometry/radians.html
//https://en.wikipedia.org/wiki/Radian
let toDegrees = (radians) => {
  return (radians * 180) / Math.PI;
}
let square = (num) => {
  return num * num;
}
let rotateVectors = (vs, t) => {
  return sortVectors(Object.keys(vs).map(v => {
    let p = vs[v].vector.magnitude;
    let rateOfRotation = (-.00025*p) * (Math.random() * (Math.random()-.01)+ .01);
    let c = vs[v].vector.coords;

    //the math.round *1000 / 1000 is a hack to
    let x = Math.round((c.x*Math.cos(rateOfRotation) - c.y*Math.sin(rateOfRotation))*1000)/1000;
    let y = Math.round((c.x*Math.sin(rateOfRotation) + c.y*Math.cos(rateOfRotation)) *1000)/1000;
    return vector(cartesian2dCoordinate(x,y))
  }));
}
