import { INITIAL_VALUE } from "../../index";

export class CalculatorController {
  #model;
  #view;
  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  handleButtons = (value) => {
    try {
      this.#model.addButtonInputValueToExpressionContent(value);
      const expression = this.#model.getExpressionContent();
      this.#view.showExpressionContent(expression);
    } catch (error) {
      this.#view.showExpressionResult(error.message);
    }
  };

  handleClearButton = () => {
    try {
      this.#model.clearExpressionContent();
      this.#view.showExpressionContent(INITIAL_VALUE);
      this.#view.showExpressionResult(INITIAL_VALUE);
    } catch (error) {
      this.#view.showExpressionResult(error.message);
    }
  };

  handleEqualButton = () => {
    try {
      this.#model.calculateExpressionContent();
      const result = this.#model.getExpressionResult();
      this.#view.showExpressionResult(result);
    } catch (error) {
      this.#view.showExpressionResult(error.message);
    }
  };

  handleBackspaceButton = () => {
    try {
      this.#model.clearLastValueOfExpressionContent();
      const expression = this.#model.getExpressionContent();
      this.#view.showExpressionContent(expression);
    } catch (error) {
      this.#view.showExpressionResult(error.message);
    }
  };

  handleKeyboardInput = (value) => {
    try {
      this.#model.addKeyboardInputValueToExpressionContent(value);
      const expression = this.#model.getExpressionContent();
      this.#view.showExpressionContent(expression);
    } catch (error) {
      this.#view.showExpressionResult(error.message);
    }
  };

  bindHandlers = () => {
    this.#view.addHandlerOnButtons(this.handleButtons);
    this.#view.addHandlerOnClearButton(this.handleClearButton);
    this.#view.addHandlerOnEqualButton(this.handleEqualButton);
    this.#view.addHandlerOnBackspaceButton(this.handleBackspaceButton);
    this.#view.addHandlerOnKeyboardInput(this.handleKeyboardInput);
  };
}
