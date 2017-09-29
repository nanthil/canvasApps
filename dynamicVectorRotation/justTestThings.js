
function testData(origin, rotated){
  //https://www.varsitytutors.com/hotmath/hotmath_help/topics/magnitude-and-direction-of-vectors
  //load this data to test functionality
  let cartesianPoints = [[2,3], [-5,-8], [3,-7], [-6, 1], [2, -7], [-6,-7],[-2, -4],[-1,-12], [3,-2]].map(
    p => cartesian2dCoordinate(p[0], p[1]
  ));
  if(rotated !== undefined){
    return testLineGeneration(rotated, origin);
  } else {

    return testLineGeneration(testVectorData(cartesianPoints), origin)
  }
}

//generate some data to draw in main
let testLineGeneration = (vs, origin) => {

  let collectionOfLinesToDraw = [];
  //data format for drawing =
  // {
  //    name: {
  //      obj1: {
  //        from: cartesian2dCoordinate,
  //        to: cartesian2dCoordinate,
  //        otherprops:...
  //      }, obj2: {
  //          ...
  //        }
  //    }
  //  }
  collectionOfLinesToDraw.push({graph: initGraph(origin)});
  collectionOfLinesToDraw.push({surroundVectors: calcLinesAroundVectors(vs, origin)});
  collectionOfLinesToDraw.push({vectorsFromOrigin: calcVectorsFromOrigin(vs,origin)});
  return flattenArrayToObject(collectionOfLinesToDraw);
}
let testVectorData = (ps) =>{
  //https://www.mathsisfun.com/algebra/vectors.html
  let vectors = genVectorsFromListOfPoints(ps, 0);
  vectors.push(add2dVectors(vector(cartesian2dCoordinate(8,13)), vector(cartesian2dCoordinate(26,7))));
  vectors.push(subVectorAfromB(vector(cartesian2dCoordinate(4,5)), vector(cartesian2dCoordinate(12,2))));
  vectors.push(vector(cartesian2dCoordinate(3,4)));
  return sortVectors(vectors);
}
