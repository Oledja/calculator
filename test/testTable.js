export const testTable = [
  {
    expression: "2+2",
    result: "4",
  },
  {
    expression: "2+2*2",
    result: "6",
  },
  {
    expression: "2+2*2-4*2",
    result: "-2",
  },
  {
    expression: "2/0",
    result: "Division by zero is not allowed",
  },
  {
    expression: "8%3",
    result: "2",
  },
  {
    expression: "cos(5)",
    result: "0.28366218546",
  },
  {
    expression: "sin(5)",
    result: "-0.95892427466",
  },
  {
    expression: "9%5%3",
    result: "1",
  },
  {
    expression: "9^(2+2)-(5/2*(9-7)/(8!))-3^7",
    result: "4373.99987599206",
  },
  {
    expression: "5!",
    result: "120",
  },

  {
    expression: "2+2+(2-",
    result: "Incorrect brackets",
  },
  {
    expression: "2+2.2.2",
    result: "Incorrect place for dot",
  },
  {
    expression: "171!",
    result: "Infinite number",
  },
  {
    expression: "-3--4",
    result: "1",
  },
  {
    expression: "",
    result: "Expression syntax error",
  },
];
