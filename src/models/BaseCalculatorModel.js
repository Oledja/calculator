export class BaseCalculatorModel {
  constructor(customButtonsConfig) {
    if (this.constructor == BaseCalculatorModel) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  getExpressionContent = () => {};
  getExpressionResult = () => {};
  addButtonInputValueToExpressionContent = () => {};
  addKeyboardInputValueToExpressionContent = () => {};
  clearExpressionContent = () => {};
  clearLastValueOfExpressionContent = () => {};
  calculateExpressionContent = () => {};
}
