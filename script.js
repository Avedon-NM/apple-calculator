class Calculator {
    constructor(screen) {
        this.screen = screen
        this.currentNumber = '0'
        this.previousNumber = '0'
        this.operant = null
        this.numberSequence = null
        this.result = null
    }

    appendNumber(clickedButton) {
        this.currentNumber = this.unformatNumber(this.screen.textContent.trim())
    
        // Determine whether the clicked button is to be appended or to start a new sequence
        if(this.numberSequence != null) {
            this.previousNumber = this.currentNumber
            this.currentNumber = '0'
            this.numberSequence = null
        }
        
        /* 
          If '.' is the first character and the current number is 0, code adds a 0 before '.'
          Also reset 'result' variable which is used for incrementation
        */
        if (this.currentNumber === '0' && clickedButton != "." || this.result != null) {
            this.currentNumber = clickedButton
            this.currentNumber === '.' ? this.display('0.') : this.display(this.currentNumber)
            this.result = null
        } else {
            if (clickedButton === '.' && this.currentNumber.includes('.')) return // Allows only one dot in a number
            if (this.currentNumber.length > 8) return 

            this.currentNumber = this.formatNumber(this.currentNumber + clickedButton)
            clickedButton === '.' ? this.display(this.currentNumber + '.') : this.display(this.currentNumber)
        }
    }

    // Puts commas in the numbers
    formatNumber(number){
        return parseFloat(number).toLocaleString('en-US', { maximumFractionDigits: 9 })
    }

    // Removes commas in the numbers
    unformatNumber(number){
        return number.replace(/,/g, '')
    }

    display(number) {
        this.screen.textContent = number
    }

    calculate() {
        
        if (this.operant === null) return false

        if(this.currentNumber === '0') this.currentNumber = this.screen.textContent.trim()
        
        this.currentNumber = Number(this.unformatNumber(this.currentNumber))
        this.previousNumber = Number(this.unformatNumber(this.previousNumber))

        switch (this.operant) {
            case '÷':
                this.result = this.formatNumber(this.previousNumber / this.currentNumber)
                break;
            case 'x':
                this.result = this.formatNumber(this.previousNumber * this.currentNumber)
                break;
            case '-':
                this.result = this.formatNumber(this.previousNumber - this.currentNumber)
                break;
            case '+':
                this.result = this.formatNumber(this.previousNumber + this.currentNumber)
                break;
        }

        this.display(this.result)
        this.currentNumber = String(this.currentNumber) // Returns back to string because the formation functions work on Strings
        this.previousNumber = this.result // For incrementation purposes

    }

    specialCalculation(operant) {

        let number = Number(this.unformatNumber(this.screen.textContent.trim()))
        this.result = 0

        switch (operant) {
            case 'AC':
                this.allClear()
                break;
            case '±':
                this.result = this.formatNumber(number *= -1)
                break;
            case '%':
                this.result = this.formatNumber(number / 100)
                break;
        }

        this.display(this.result)
    }

    setOperant(operant) {
        this.operant = operant
        this.numberSequence = this.screen.textContent.trim()
    }

    allClear() {
        this.display('0')
        this.previousNumber = '0'
        this.currentNumber = '0'
        this.operant = null
    }
}

let screen = document.querySelector('.screen')
calculator = new Calculator(screen)

// Gets the operant
document.querySelectorAll('.btn-operant').forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.setOperant(event.target.textContent)
    })
});

// Gets special buttons such as % and +/-
document.querySelectorAll('.btn-special').forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.specialCalculation(event.target.textContent)
    })
});

// Gets the button which is clicked
number = document.querySelectorAll('.btn-num').forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.appendNumber(event.target.textContent)
    })
});

// Triggered when the equals sign is clicked
document.querySelector('.btn-equals').addEventListener('click', (event) => {
    event.preventDefault()
    calculator.calculate()
})
