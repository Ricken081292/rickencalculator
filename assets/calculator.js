import Storage from "./storage.js";

export default class {
  static buttons = document.querySelectorAll(".button");
  static displayNumber = "0";
  static operator = null;
  static firstNumber = null;
  static isWaitForSecondNumber = false;
  static result = false;

  static updateDisplay() {
    document.querySelector("#displayNumber").innerHTML = this.displayNumber;
  }
  static clear() {
    this.displayNumber = "0";
    this.operator = null;
    this.firstNumber = null;
    this.isWaitForSecondNumber = false;
  }
  static updateDigit(digit) {
    this.displayNumber === "0" || this.result
      ? (this.displayNumber = digit)
      : (this.displayNumber += digit);
  }
  static handleOperator(operator) {
    if (!this.isWaitForSecondNumber) {
      this.operator = operator;
      this.firstNumber = this.displayNumber;
      this.isWaitForSecondNumber = true;
      this.displayNumber = "0";
    } else {
      alert("Operator Sudah Di Tetapkan !!");
    }
  }
  static inverseNumber() {
    if (this.displayNumber === "0") {
      return;
    }
    this.displayNumber = this.displayNumber * -1;
  }

  static hasil() {
    let result = null;
    if (this.isWaitForSecondNumber) {
      switch (this.operator) {
        case "+":
          result = parseInt(this.firstNumber) + parseInt(this.displayNumber);
          break;
        case "-":
          result = parseInt(this.firstNumber) - parseInt(this.displayNumber);
          break;
      }
      const data = {
        angkaPertama: this.firstNumber,
        angkaKedua: this.displayNumber,
        operator: this.operator,
        result,
      };
      this.isWaitForSecondNumber = false;
      this.result = true;
      this.displayNumber = result;
      Storage.pushHistory(data);
      Storage.renderHistory();
    } else {
      alert("Operator Belum Di Tetapkan");
    }
  }

  static main() {
    // event
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.classList.contains("clear")) {
          this.clear();
          this.updateDisplay();
          return;
        } else if (e.target.classList.contains("negative")) {
          this.inverseNumber();
          this.updateDisplay();
          return;
        } else if (e.target.classList.contains("operator")) {
          this.handleOperator(e.target.innerHTML);
          this.updateDisplay();
          return;
        } else if (e.target.classList.contains("equals")) {
          this.hasil();
          this.updateDisplay();
          return;
        }
        this.updateDigit(e.target.innerHTML);
        this.result = false;
        this.updateDisplay();
        return;
      });
    });
    Storage.renderHistory();
    this.updateDisplay();
  }
}
