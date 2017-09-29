(vectorlib = 
    (
        stdlib,
        twoD = (

            { object, mathOps } = stdlib,
            { 
                range,mul,sum,sub,div,mod,square,both,either,lt,gt,eq,neq,lte,gte,lbs,rbs,bor,xor,band,curMod,curMul,curEq,odd,even,negate,equalsZero,isDivisible,min,max,compose 
            } = mathOps(),
            { freeze } = object(),

            Color4  = (x,y,z,a) => freeze([x,y,z,a]),
            Vector2 = (x,y) => freeze([x,y]),
            Vector2Zero = () => Vector2(0,0),
                  
            //these functions take 1 Vector2D, wrapper is the return type
            OneVector2Transform = wrapperFn => op => ([x,y]) => wrapperFn(op(x),op(y)),
                OneReturnVector2 = OneVector2Transform(Vector2), //wrapper
                    Vector2Negate    = OneReturnVector2(negate),
                    Vector2Scale     = vec => scale => OneReturnVector2(curMul(scale))(vec),
                    Vector2LenSqr    = vec => sum(...OneReturnVector2(square)(vec)),
                    Vector2Length    = compose(Math.sqrt, Vector2LenSqr),
                    Vector2Normalize = (
                        vec,
                        len = Vector2Length(vec)
                    ) => (
                        !equalsZero(len) 
                        ? OneReturnVector2(curMul(div(1.0,len)))(vec)
                        : false
                    ),
            
            //vector transformations with 2 vectors, wrapperFn is the return type i.e. Vector2D, boolean, etc
            TwoVector2Transform = wrapperFn => op => ([x1,y1], [x2,y2]) => wrapperFn(op(x1,x2), op(y1,y2)),
                TwoReturnVector2   = TwoVector2Transform(Vector2),//wrapperFn
                    Vector2Add     = TwoReturnVector2(sum),
                    Vector2Sub     = TwoReturnVector2(sub),
                    Vector2Mul     = TwoReturnVector2(mul),
                    Vector2Div     = TwoReturnVector2(div),
                    Vector2DistSqr = (v1,v2) => Vector2LenSqr(Vector2Sub(v1,v2)),
                    Vector2Dist    = (v1,v2) => Math.sqrt (Vector2DistSqr(v1,v2))
             


        ) => ({
            Vector2, Vector2Zero, 

            OneVector2Transform, OneReturnVector2,
            Vector2Negate,Vector2Scale,Vector2LenSqr, Vector2Length, Vector2Normalize, 

            TwoVector2Transform, TwoReturnVector2,
            Vector2Add,Vector2Sub,Vector2Mul,Vector2Div, Vector2Dist,Vector2DistSqr

        }),
        threeD = (

        ) => ({

        })
    ) => ({
        twoD,
        threeD
    })
);

(oof =
    (
        declare = 'private variables',
        and = (otherFunctions) => (
            thatDoSomething ='.'
        ),
        notice = (
            how = (
                there = () => 'is',
                no = 'syntax'
            ) => (
                but = 'there is only array functions and IIFes'
            )
        )

    ) => ({
        //everything is nicely scoped
        //this of this return object as the export from oof
        notice,
        declare
        //there, no, and but are not available here
        //uncomment this line to see an error because of the scoping
        //there,no,but 
    })
)()