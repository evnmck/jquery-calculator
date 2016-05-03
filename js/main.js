var numString = '',
    numArray = [],
    opArray = [],
    screenArray = [],
    answerFlag = false,
    symbol,
    numTally = 0,
    result

$(() => {
    $('span').on('click', function() {
        symbol = $(this).text()
        if (symbol.search(/[0-9]/g) != -1) {
            if (answerFlag === true) {
                answerFlag = false
                clear()
            }
            numString += symbol //add more numbers to string
            numTally++ //prove there was number input
            screenArray.push(' ', symbol, ' ')
        } else {
            if (answerFlag === true) { //previous answer in array
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
                    clear()
                    break;
            }
        }
        $('#screen').html(screenArray)


        function operator(symbol) {
            numTally = 0
            if (numString != '') {
                numArray.push(parseInt(numString))
            }
            opArray.push(symbol)
            screenArray.push(' ', symbol, ' ')
            numString = ''
        }

        function clear() {
            result = 0
            numTally = 0
            numString = ''
            numArray = []
            opArray = []
            screenArray = []
        }

        function showAnswer() {
            answerFlag = true
            opArray.pop()
            while (opArray.length > 0) {
                var firstNum = numArray[0]
                var secondNum = numArray[1]
                var firstOp = opArray[0]
                result = 0
                if (firstOp === '/') {
                    result = Math.round(firstNum / secondNum * 100) / 100
                    shiftArrays()
                } else if (firstOp === 'x') {
                    result = firstNum * secondNum
                    shiftArrays()
                } else if (firstOp === '+') {
                    result = firstNum + secondNum
                    shiftArrays()
                } else if (firstOp === '-') {
                    result = firstNum - secondNum
                    shiftArrays()
                }
                numArray.unshift(result)
            }
            result = Math.round(numArray[0] * 100) / 100
            screenArray.push(result)
        }

        function shiftArrays() {
            numArray.shift()
            numArray.shift()
            opArray.shift()
        }

    })
})
