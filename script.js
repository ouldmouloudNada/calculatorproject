document.addEventListener('DOMContentLoaded', function () {
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const buttons = document.querySelectorAll('.btn');
    const equalButton = document.querySelector('.equal');
    const resetButton = document.querySelector('.reset');
    const deleteButton = document.querySelector('.del');

    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    function updateDisplay() {
        currentOperandTextElement.textContent = currentOperand;
        if (operation != null) {
            previousOperandTextElement.textContent = `${previousOperand} ${operation}`;
        } else {
            previousOperandTextElement.textContent = '';
        }
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function chooseOperation(operator) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = operator;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        operation = undefined;
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    }

    function deleteLast() {
        currentOperand = currentOperand.toString().slice(0, -1);
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.textContent;
            if (['+', '-', 'x', '/'].includes(value)) {
                chooseOperation(value);
            } else {
                appendNumber(value);
            }
            updateDisplay();
        });
    });

    equalButton.addEventListener('click', function () {
        compute();
        updateDisplay();
    });

    resetButton.addEventListener('click', function () {
        clear();
        updateDisplay();
    });

    deleteButton.addEventListener('click', function () {
        deleteLast();
        updateDisplay();
    });

    // Initial display update to show default values
    updateDisplay();
});
