(stdlib = (
    object = (
        { mapfh } = arrayMethods(),
        freeze = o => Object.freeze(o),
        values = o => mapfh(Object.keys(o))(x => o[x]),
        keys   = o => Object.keys(o)

    ) => ({
        freeze, values

    }),

    mathOps = (

        range = (low, high, filter) => 
            either(both(!high, lt(low,0)), both(high, lt(high, low)))
            ? [] 
            : both(high, filter)
            ? [...Array(sub(high,low))].map((x,i) => sum(i, low)).filter(isDivisibleBy(filter)) 
            : both(high, gt(high, low))
            ? [...Array(sub(high, low))].map((x,i) => sum(i, low))
            : [...Array(low)].map((x,i) => i),
    
        compose = (fn, fn1) => arg => fn(fn1(arg)),
    
    //TODO enforce integer only
        mathOps = (operator) => (a, b) => eval('('+ a +')' + operator + '('+ b +')'),
            //arithmetic operators i*  +  -   / %
            mul    = mathOps('*'), 
            sum    = mathOps('+'),
            sub    = mathOps('-'), 
            div    = (a,b) => both(neq(a,0),neq(b,0)) ? mathOps('/')(a,b) : NaN, 
            mod    = mathOps('%'),
            square = x => mul(x,x), 
            //boolean operators && || < > ===
            both   = mathOps('&&'), 
            either = mathOps('||'), 
            lt     = mathOps('<'), 
            gt     = mathOps('>'), 
            eq     = mathOps('==='),
            neq    = (a,b) => !eq(a,b),
            lte    = (a,b) => !gt(a,b), 
            gte    = (a,b) => !lt(a,b), 
            //bitwise operators << >> | & ^ 
            lbs    = mathOps('<<'), 
            rbs    = mathOps('>>'), 
            bor    = mathOps('|'), 
            xor    = mathOps('^'), 
            band   = mathOps('&'), 
            curMod = x => y => mod(y,x),
            curMul = x => y => mul(x,y),
            curEq  = x => y => eq(x,y),
            odd    = x => Boolean(band(x,1)), 
            even   = x => !odd(x),
            negate = x => (-x),
            equalsZero    = x => eq(0,x),
            isDivisibleBy = x => compose(equalsZero, curMod(x)),
    
        compare = fn => eq(2, fn.length) 
            ? (a,b) => fn(a,b) ? a : b 
            : 'cannot use function "compare" with curried function that takes less than 2 args',
            min = compare(lt),
            max = compare(gt)
        
    
    ) => ({
        range,mul,sum,sub,div,mod,square,
        both,either,lt,gt,eq,neq,lte,gte,
        lbs,rbs,bor,xor,band,
        curMod,curMul,curEq,odd,even,
        negate,equalsZero,isDivisibleBy,
        min,max,compose
    }),
    arrayMethods = (
        {sum,eq,lt,gte} = mathOps(),
        depfhcond = a => (a => i => lt(i, a.length))(a),
        defit     = i => sum(i,1),

        pfhor = (cond, action, it) => (i, result) => 
            cond(i, result) 
            ? pfhor(cond, action, it) (it(i), action(i, result))
            : result,

        pfhorEach = a => fn => pfhor(
            cond = depfhcond(a),
            action = (a => i => fn(a[i], i, a))(a),
            it = defit
        )(0),

        mapfh = a => fn => pfhor(
            cond   = depfhcond(a),
            action = (a => (i, r = []) => r.concat(fn(a[i], i, a)))(a),
            it     = defit
        )(0),
        
        pfhilter = a => fn => pfhor(
            cond   = depfhcond(a),
            action = (a => (i, result = []) => fn(a[i], i, a) ? result.concat(a[i]) : result)(a),
            it     = defit
        )(0),
        pfhind   = a => fn => pfhor(
            cond   = (i,r) => !r,
            action = (a => (i,r) => fn(a[i], i, a) ? a[i] : undefined)(a),
            it     = defit
        )(0),
        redeuce  = a => fn => pfhor(
            cond   = (i,r) => !r || r.length >= 1,
            action = (a => (i,r=a) => 
                eq(r.length,1)
                ? r[0] 
                : [fn(r.slice(0,1)[0],r.slice(1,2)[0])].concat(r.slice(2,r.length)))(a),
            it = () => 0
        )(0)

        ) => ({//array exports
            pfhor,
            mapfh,
            pfhilter,
            pfhind,
            pfhorEach,
            redeuce
        })
    ) => ({//stdlib exports
        arrayMethods, 
        object,
        mathOps
    })
)