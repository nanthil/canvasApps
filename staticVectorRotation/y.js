(why =
    (
        isGreaterThan = (x,y) => y > x,
        subtract = (x,y) => x - y, 
        multiply = (x, y) => x * y,
 
        theYCombinatorPoem = why ? 'because' : 'I can',
 
        instructions = `In order to understand the "Y" Combinator,
        read everything from line 15 to line 34 like an English sentence,
        pausing at each line break,
        like a comma or period in English. Punctuation is commented.
        For extra fun, read line 48`,
 
        doFactorial = recursively => (forEveryNumber, //.
            iff = number => isGreaterThan(1, number),
            eachResultingNumber = greaterThanOne =>
                recursively(subtract(greaterThanOne, 1)),//.
            then = withNumber =>
                multiply(eachResultingNumber(withNumber), withNumber)/*.*/) => iff(forEveryNumber) ? then(forEveryNumber) : 1,
 
        using = only => functionApplication => (//,
            functionApplication(only)),
 
        youCan = doAnythingLike => normalCode => //.
            (doAnythingLike(functions => using(functions)(using(normalCode)//!
                (normalCode))))/*!!!*/,
 
        functions = (doRecursionAnd=doFactorial) => 
            youCan(doRecursionAnd), just = using(functions())//...?
                (functions())//?
 
    ) => ({
        youCan, doFactorial, just/*.*/, using/*.*/, functions//.
    })
);
///for simple usage of the y combinator, 
/// import functions and using
/// pass functions a function of the type fn -> fn -> a -> fn(a)
///pass using functions twice

///for example:
///loop = fn => args => fn(args)
///loopy = functions(loop)
///using(loopy)(loopy)

// (testTheYCombinator =
//     (
//         testArr,
//         { youCan, doFactorial, just, using, functions } = why(),

//         facts = testArr.map(stopit => ({
//             [stopit]: just(stopit)
//         })),

//         factsRound2/*fight!!!*/ = testArr.map(okYouMadeYourPoint => ({
//             [okYouMadeYourPoint + ': result ']:
//             using(functions())(youCan(doFactorial))(okYouMadeYourPoint)
//         }))    

//     ) => ({
//         facts, factsRound2
//     })
// )
// console.log(testTheYCombinator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))