var numString = '',
    numArray = [],
    opArray = [],
    screenArray = [],
    symbol,
    numTally = 0,
    showsAnswer = false

$(() => {
    $('span').on('click', function() {
        symbol = $(this).text()
        if (showsAnswer === true) {
            screenArray = []
            $('#screen').html(screenArray)
            showsAnswer = false
        } else if (symbol.search(/[0-9]/g) != -1) { // check for number
            numString += symbol //add more numbers to string
            numTally++ //prove there was number input
            screenArray.push(' ', symbol, ' ')
            $('#screen').html(screenArray)
        } else {
            switch (symbol) {
                case '+':
                case '-':
                case '/':
                case 'x':
                    if (numTally === 0) { // can't have 2 operators
                        break
                    } else {
                        operator(symbol)
                        break
                    }
                case '=':
                    if (numTally === 0) {
                        break
                    } else {
                        operator(symbol)
                        screenArray = []
                        tally = 0
                        showAnswer()
                        $('#screen').html(screenArray)
                        showsAnswer = true
                        break;
                    }
                case 'C':
                    numString = ''
                    numArray = []
                    opArray = []
                    screenArray = []
                    $('#screen').html(screenArray)
                    break;
            }
        }
    })
})


function operator(symbol) {
    numTally = 0
    numArray.push(parseInt(numString))
    opArray.push(symbol)
    screenArray.push(' ', symbol, ' ')
    $('#screen').html(screenArray)
    numString = ''

}

function showAnswer() {
    var result = 0
    var firstNum = numArray[numArray.length - 2]
    var secondNum = numArray[numArray.length - 1]
    opArray.pop()
    if (opArray[opArray.length - 1] === '/') {
        result = firstNum / secondNum
        numArray.pop()
        numArray.pop()
        opArray.pop()
    } else if (opArray[opArray.length - 1] === 'x') {
        result = firstNum * secondNum
        numArray.pop()
        numArray.pop()
        opArray.pop()
    }

    screenArray.push(Math.round(result * 100) / 100)

}
