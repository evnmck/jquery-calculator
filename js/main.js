var numString = '',
    numArray = [],
    opArray = [],
    screenArray = [],
    answerFlag = false,
    symbol,
    numTally = 0

$(() => {
    $('span').on('click', function() {
        symbol = $(this).text()
        if (symbol.search(/[0-9]/g) != -1) {
            if (answerFlag === true) {
                answerFlag = false
                screenArray = []
            }
            numString += symbol //add more numbers to string
            numTally++ //prove there was number input
            screenArray.push(' ', symbol, ' ')
        } else {
            if (answerFlag === true) {
                answerFlag = false
                numTally++
            }
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
                        showAnswer()
                        break;
                    }
                case 'C':
                    numTally = 0
                    numString = ''
                    numArray = []
                    opArray = []
                    screenArray = []
                    break;
            }
        }
        $('#screen').html(screenArray)


        function operator(symbol) {
            numTally = 0
            numArray.push(parseInt(numString))
            opArray.push(symbol)
            screenArray.push(' ', symbol, ' ')
            numString = ''
        }

        function showAnswer() {
            answerFlag = true
            opArray.pop()
            while (opArray.length > 0) {
                var firstNum = numArray[numArray.length - 2]
                var secondNum = numArray[numArray.length - 1]
                var lastOp = opArray[opArray.length - 1]
                var result = 0
                if (lastOp === '/') {
                    result = Math.round(firstNum / secondNum * 100) / 100
                    numArray.pop()
                    numArray.pop()
                    opArray.pop()
                } else if (lastOp === 'x') {
                    result = firstNum * secondNum
                    numArray.pop()
                    numArray.pop()
                    opArray.pop()
                } else if (lastOp === '+') {
                    result = firstNum + secondNum
                    numArray.pop()
                    numArray.pop()
                    opArray.pop()
                } else if (lastOp === '-') {
                    result = firstNum - secondNum
                    numArray.pop()
                    numArray.pop()
                    opArray.pop()
                }
                numArray.push(result)
            }
            result = Math.round(result * 100) / 100
            screenArray.push(result)
        }

    })
})
