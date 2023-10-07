export class BaseCalculatorView {
  constructor(customButtonsConfig, serviceButtonsConfig) {
    if (this.constructor == BaseCalculatorView) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  addHandlerOnButtons = () => {};
  addHandlerOnClearButton = () => {};
  addHandlerOnEqualButton = () => {};
  addHandlerOnBackspaceButton = () => {};
  addHandlerOnKeyboardInput = () => {};
  showExpressionContent = () => {};
  showExpressionResult = () => {};
  render = () => {};
}
