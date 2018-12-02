let nbrMoves = 6;
let goal = 126;
let start = 111;

let options = [
    {
        operation : 'mult',
        param : 3
    },
    {
        operation : 'min',
        param : 9
    },
    {
        operation : 'removeLast'
    },
    {
        operation : 'inv'
    }
]; //*-3, /3, +9, =/-

var tests = [];

for (let i=0; i<nbrMoves;i++) {
    let soluce = testOptions(i);
    if (soluce) {
        console.log(soluce);
        break;
    }
}

function testOptions(step) {
    tests[step] = [];
    if (step === 0) {
        let soluce = loopOoptions(step);
        if (soluce) return soluce;
    } else {
        for (let i = 0; i<tests[step-1].length; i++) {
            let soluce = loopOoptions(step, i);
            if (soluce) return soluce;
        }
    }
}

function loopOoptions(step, i = null) {
    for (let j = 0; j<options.length; j++) {
        let baseOperation = (typeof tests[step - 1] === 'undefined' ? '' : tests[step-1][i].operations);
        let baseResult = (typeof tests[step - 1] === 'undefined' ? start : tests[step-1][i].result);
        let test = {
            operations : baseOperation +' '+options[j].operation,
            result : executeOperation( baseResult, options[j])
        }
        tests[step].push(test);
        if (test.result == goal) {
            return test;
        }
    }
}

function executeOperation(value, option) {
    let result = value;
    switch (option.operation) {
        case 'mult':
                result = result * option.param;
            break;
    
        case 'div':
            result = result / option.param;
            break;
        case 'min':
            result = result - option.param;
            break;
        case 'add':
            result = result + option.param;
            break;
        case 'inv':
            result = -result;
            break;
        case 'removeLast':
            if (result < 10 && result > -10) {
                result = 0;
            } else {
                let temp = result.toString();
                temp = temp.slice(0, -1);
                result = parseFloat(temp);
            }
            break;
    }
    // console.log(value+ ' '+ option.operation+' ' + option.param + ' = '+result);
    return result;
}
