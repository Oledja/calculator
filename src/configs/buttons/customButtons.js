import { numberRegExp } from "../../index";

export const customButtons = new Map([
  [
    "%",
    {
      buttonName: "%",
      buttonValue: "%",
      operationValue: "\\%",
      operationRegExp: `${numberRegExp}\\%${numberRegExp}`,
      operationPriority: 1,
      operationAction(operand1, operand2) {
        return operand1 % operand2;
      },
    },
  ],
  [
    "*",
    {
      buttonName: "*",
      buttonValue: "*",
      operationValue: "\\*{1}",
      operationRegExp: `${numberRegExp}\\*{1}${numberRegExp}`,
      operationPriority: 2,
      operationAction(operand1, operand2) {
        return operand1 * operand2;
      },
    },
  ],
  [
    "/",
    {
      buttonName: "/",
      buttonValue: "/",
      operationValue: "\\/{1}",
      operationRegExp: `${numberRegExp}\\/{1}${numberRegExp}`,
      operationPriority: 2,
      operationAction(operand1, operand2) {
        if (operand2 === 0) {
          throw new Error("Division by zero is not allowed");
        }
        return operand1 / operand2;
      },
    },
  ],
  [
    "-",
    {
      buttonName: "-",
      buttonValue: "-",
      operationValue: "\\-",
      operationRegExp: `${numberRegExp}\\-${numberRegExp}`,
      operationPriority: 3,
      operationAction(operand1, operand2) {
        return operand1 - operand2;
      },
    },
  ],
  [
    "+",
    {
      buttonName: "+",
      buttonValue: "+",
      operationValue: "\\+",
      operationRegExp: `${numberRegExp}\\+${numberRegExp}`,
      operationPriority: 3,
      operationAction(operand1, operand2) {
        return operand1 + operand2;
      },
    },
  ],
  [
    "sin",
    {
      buttonName: "sin",
      buttonValue: "sin(",
      operationValue: "sin",
      operationRegExp: `sin${numberRegExp}`,
      operationPriority: 1,
      operationAction(operand) {
        return Math.sin(operand);
      },
    },
  ],
  [
    "cos",
    {
      buttonName: "cos",
      buttonValue: "cos(",
      operationValue: "cos",
      operationRegExp: `cos${numberRegExp}`,
      operationPriority: 1,
      operationAction(operand) {
        return Math.cos(operand);
      },
    },
  ],
  [
    "^",
    {
      buttonName: "^",
      buttonValue: "^",
      operationValue: "\\^",
      operationRegExp: `${numberRegExp}\\^${numberRegExp}`,
      operationPriority: 2,
      operationAction(operand1, operand2) {
        return Math.pow(operand1, operand2);
      },
    },
  ],
  [
    "!",
    {
      buttonName: "x!",
      buttonValue: "!",
      operationValue: "\\!",
      operationRegExp: `${numberRegExp}\\!`,
      operationPriority: 1,
      operationAction(operand) {
        try {
          if (operand === 0) {
            return 1;
          } else {
            return operand * this.operationAction(operand - 1);
          }
        } catch (error) {
          throw new Error("Infinite number");
        }
      },
    },
  ],
]);
