import {
  ButtonType,
  onlyDigits,
  spaceRegExp,
  numberRegExp,
  INITIAL_VALUE,
  bracketsRegExp,
  incorrectDotRegExp,
  incorecrPlaceForNumber,
  incorrectBracketsRegExp,
} from "../../index";
import { BaseCalculatorModel } from "../BaseCalculatorModel";

const numberOfDigitsAfterPoint = process.env.NUMBER_OF_DIGITS_AFTER_POINT;

export class CalculatorModel extends BaseCalculatorModel {
  constructor(customButtonsConfig) {
    super(customButtonsConfig);
    this.#operators = customButtonsConfig;
  }

  #operators;
  #expressionContent = "";
  #expressionResult = "";

  getExpressionContent = () => {
    return this.#expressionContent;
  };

  getExpressionResult = () => {
    return this.#expressionResult;
  };

  addButtonInputValueToExpressionContent = (value) => {
    if (
      !Boolean(this.#expressionContent) &&
      value === ButtonType.DECIMAL_POINT
    ) {
      this.#expressionContent = INITIAL_VALUE + value;
      return;
    }
    this.#expressionContent += value;
  };

  addKeyboardInputValueToExpressionContent = (value) => {
    this.#expressionContent = value;
  };

  clearExpressionContent = () => {
    this.#expressionContent = "";
    this.#expressionResult = "";
  };

  clearLastValueOfExpressionContent = () => {
    if (this.#expressionContent.length <= 1) {
      this.#expressionContent = "";
      return;
    }
    this.#expressionContent = this.#expressionContent.slice(0, -1);
  };

  calculateExpressionContent = () => {
    this.#expressionResult = this.#calculate(this.#expressionContent);
  };

  #calculate = (expression) => {
    expression = this.#removeSpaces(expression);

    if (this.#validateIncorrectDot(expression)) {
      throw new Error("Incorrect place for dot");
    }

    if (
      this.#validateIncorrectPlaceForNumber(expression) ||
      !Boolean(this.#expressionContent)
    ) {
      throw new Error("Expression syntax error");
    }

    const result = this.#calculateExpression(expression);
    return this.#roundDecimals(result);
  };

  #calculateExpression = (expression) => {
    let currentExpression = expression;

    if (this.#isNumber(currentExpression)) {
      return Number(currentExpression);
    }

    if (this.#hasBrackets(currentExpression)) {
      currentExpression = currentExpression.replace(
        bracketsRegExp,
        (_, currentExpression) => {
          return this.#calculateExpression(currentExpression);
        }
      );

      return this.#calculateExpression(currentExpression);
    } else {
      if (this.#validateIncorrectBrackets(currentExpression)) {
        throw new Error("Incorrect brackets");
      }

      const currentOperations =
        this.#findAllOperatorsAndSortByPriority(currentExpression);

      for (let i = 0; i < currentOperations.length; i++) {
        const { operationRegExp } = currentOperations[i];
        currentExpression = currentExpression.replace(
          new RegExp(operationRegExp),
          (expression) => {
            const operands = this.#getOperands(expression);
            const result = currentOperations[i].operationAction(...operands);

            if (!isFinite(result)) {
              throw new Error("Infinite number");
            }

            return result;
          }
        );
      }

      if (this.#isNumber(currentExpression)) {
        return currentExpression;
      } else {
        throw new Error("Expression syntax error");
      }
    }
  };

  #isNumber = (value) => {
    return new RegExp(`^${numberRegExp}$`).test(value);
  };

  #removeSpaces = (expression) => expression.replace(spaceRegExp, "");

  #hasBrackets = (expression) => bracketsRegExp.test(expression);

  #validateIncorrectBrackets = (expression) =>
    incorrectBracketsRegExp.test(expression);

  #validateIncorrectDot = (expression) => incorrectDotRegExp.test(expression);

  #getOperands = (expression) => {
    const operands = expression.match(new RegExp(numberRegExp, "g"));
    return operands.map((operand) => Number(operand));
  };
  #validateIncorrectPlaceForNumber = (expression) =>
    incorecrPlaceForNumber.test(expression);

  #findAllOperatorsAndSortByPriority = (expression) => {
    const operatorValues = [];
    for (let operator of this.#operators.values()) {
      operatorValues.push(operator.operationValue);
    }
    const operatorsRegExp = operatorValues.join("|");
    const allMaches = expression.match(new RegExp(operatorsRegExp, "g"));
    if (!Boolean(allMaches)) {
      throw new Error("Unsupported operation");
    }

    const currentOperators = allMaches.map((operatorValue) => {
      return this.#operators.get(operatorValue);
    });

    return currentOperators.sort((operator1, operator2) => {
      return operator1.operationPriority - operator2.operationPriority;
    });
  };

  #roundDecimals = (value) => {
    let currentValue = value.toString();
    if (!onlyDigits.test(currentValue)) {
      return currentValue;
    }
    if (Number.isInteger(currentValue)) {
      return currentValue;
    } else {
      currentValue = parseFloat(currentValue).toString();
      const numberAfterPoint = currentValue.split(ButtonType.DECIMAL_POINT)[1];
      if (Boolean(numberAfterPoint)) {
        if (numberAfterPoint.length > numberOfDigitsAfterPoint) {
          return Number(currentValue).toFixed(numberOfDigitsAfterPoint);
        }
      }
      return currentValue;
    }
  };
}
