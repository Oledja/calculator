import {
  ButtonType,
  inputStyle,
  resultStyle,
  keypadStyle,
  buttonStyle,
  INITIAL_VALUE,
  calculatorStyle,
  customButtonAreaStyle,
  serviceButtonsAreaStyle,
} from "../../index";
import {
  maxInputAreaFontSize,
  minInputAreaFontSize,
  serviceButtonsRowCount,
  serviceButtonsColumsCount,
} from "./config";
import {
  getButtonsByIds,
  serviceButtonIds,
  customButtonsIds,
} from "./buttonIds";
import { BaseCalculatorView } from "../BaseCalculatorView";

const mainDivName = process.env.MAIN_DIV_NAME;

export class CalculatorView extends BaseCalculatorView {
  #serviceButtons;
  #customButtons;
  #input = document.createElement("input");
  #result = document.createElement("div");
  #keypad = document.createElement("div");
  #serviceButtonsArea = document.createElement("div");
  #customButtonsArea = document.createElement("div");
  #buttonItems = new Map();

  constructor(customButtonsConfig, serviceButtonsConfig) {
    super(customButtonsConfig, serviceButtonsConfig);
    this.#serviceButtons = getButtonsByIds(
      serviceButtonIds,
      serviceButtonsConfig
    );
    this.#customButtons = getButtonsByIds(
      customButtonsIds,
      customButtonsConfig
    );
  }

  addHandlerOnButtons = (handler) => {
    const buttons = [];
    for (let [buttonValue, buttonConfig] of this.#serviceButtons.entries()) {
      if (
        buttonValue !== ButtonType.BACKSPACE ||
        buttonValue !== ButtonType.CLEAR ||
        buttonValue !== ButtonType.EQUAL
      ) {
        const button = this.#createButton(buttonConfig);

        if (buttonValue === ButtonType.ZERO) {
          button.classList.add(buttonStyle.zeroButton);
        }

        this.#buttonItems.set(buttonValue, button);
        buttons.push(button);
      }
    }
    for (let [buttonValue, buttonConfig] of this.#customButtons.entries()) {
      const button = this.#createButton(buttonConfig);
      this.#buttonItems.set(buttonValue, button);
      button.classList.add(buttonStyle.customButton);
      buttons.push(button);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const { value } = event.target;
        handler(value);
      });
    });
  };

  addHandlerOnClearButton = (handler) => {
    const buttonConfig = this.#serviceButtons.get(ButtonType.CLEAR);
    const { buttonValue } = buttonConfig;
    const button = this.#createButton(buttonConfig);
    button.classList.add(buttonStyle.clearButton);
    this.#buttonItems.set(buttonValue, button);
    button.addEventListener("click", () => {
      handler();
    });
  };

  addHandlerOnEqualButton = (handler) => {
    const buttonConfig = this.#serviceButtons.get(ButtonType.EQUAL);
    const { buttonValue } = buttonConfig;
    const button = this.#createButton(buttonConfig);
    button.classList.add(buttonStyle.equalButton);
    this.#buttonItems.set(buttonValue, button);
    button.addEventListener("click", () => {
      handler();
    });
  };

  addHandlerOnBackspaceButton = (handler) => {
    const buttonConfig = this.#serviceButtons.get(ButtonType.BACKSPACE);
    const { buttonValue } = buttonConfig;
    const button = this.#createButton(buttonConfig);
    button.classList.add(buttonStyle.backspaceButton);
    this.#buttonItems.set(buttonValue, button);
    button.addEventListener("click", () => {
      handler();
    });
  };

  addHandlerOnKeyboardInput = (handler) => {
    this.#input.addEventListener("input", (event) => {
      const { value } = event.target;
      handler(value);
    });
  };

  showExpressionContent = (value) => {
    this.#input.value = value;
    this.#changeInputAreaFontSize();
  };

  showExpressionResult = (value) => {
    this.#result.innerText = value;
  };

  render = () => {
    this.#input.value = INITIAL_VALUE;
    this.#result.innerText = INITIAL_VALUE;
    this.#input.classList.add(inputStyle.input);
    this.#result.classList.add(resultStyle.result);
    this.#keypad.classList.add(keypadStyle.keypad);
    this.#serviceButtonsArea.classList.add(
      serviceButtonsAreaStyle.serviceButtonsArea
    );
    this.#customButtonsArea.classList.add(
      customButtonAreaStyle.customButtonsArea
    );

    const calculator = document.querySelector(`.${mainDivName}`);
    calculator.classList.add(calculatorStyle.calculator);

    for (let buttonId of this.#serviceButtons.keys()) {
      const buttonItem = this.#buttonItems.get(buttonId);
      this.#serviceButtonsArea.append(buttonItem);
    }
    for (let buttonId of this.#customButtons.keys()) {
      const buttonItem = this.#buttonItems.get(buttonId);
      this.#customButtonsArea.append(buttonItem);
    }
    this.#keypad.append(this.#customButtonsArea, this.#serviceButtonsArea);
    this.#calculateCustomButtonsGrid();
    calculator.append(this.#input, this.#result, this.#keypad);
  };

  #createButton = (buttonConfig) => {
    const { buttonName, buttonValue } = buttonConfig;
    const button = document.createElement("button");
    button.classList.add(buttonStyle.button);
    button.classList.add(buttonValue);
    button.setAttribute("value", buttonValue);
    button.textContent = buttonName;

    return button;
  };

  #changeInputAreaFontSize = () => {
    let { style } = this.#input;
    let currentFontSize = Number(style.fontSize.replace("px", ""));

    if (this.#isInputAreaOverflown(this._input)) {
      while (this.#isInputAreaOverflown(this._input)) {
        currentFontSize -= 1;
        if (currentFontSize <= minInputAreaFontSize) {
          break;
        }
        style.fontSize = currentFontSize + "px";
      }
    } else {
      currentFontSize = maxInputAreaFontSize;
      style.fontSize = currentFontSize + "px";
      while (this.#isInputAreaOverflown(this._input)) {
        currentFontSize -= 1;
        style.fontSize = currentFontSize + "px";
      }
    }

    this.#input.focus();
    this.#input.selectionStart = this.#input.value.length;
  };

  #isInputAreaOverflown = () => {
    return this.#input.scrollWidth > this.#input.clientWidth;
  };

  #calculateCustomButtonsGrid = () => {
    if (this.#customButtons.size <= serviceButtonsColumsCount) {
      this.#keypad.style.gridTemplateRows = "1fr";
      this.#keypad.style.gridTemplateColumns = "1fr";
      this.#customButtonsArea.style.setProperty("--grid-rows", 1);
      this.#customButtonsArea.style.setProperty(
        "--grid-cols",
        serviceButtonsColumsCount
      );
    } else {
      const colums = Math.ceil(
        this.#customButtons.size / serviceButtonsRowCount
      );
      this.#customButtonsArea.style.setProperty(
        "--grid-rows",
        serviceButtonsRowCount
      );
      this.#customButtonsArea.style.setProperty("--grid-cols", colums);
    }
  };
}
