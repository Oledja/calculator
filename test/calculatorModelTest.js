import { testTable } from "./testTable";

export const testModel = (model) => {
  let count = 1;
  let passedTestsCount = 0;
  let failedTestsCount = 0;
  testTable.forEach((data) => {
    const { expression, result } = data;
    try {
      model.addKeyboardInputValueToExpressionContent(expression);
      model.calculateExpressionContent();
      const currentResult = model.getExpressionResult();
      const isSuccess = result === currentResult;

      console.log(`# ${count}`);
      console.log(`expression: ${expression}`);
      console.log(`expected result: ${result}`);
      console.log(`current result: ${currentResult}`);
      console.log(`success: ${isSuccess}`);
      console.log("-".repeat(20));

      count += 1;
      isSuccess ? (passedTestsCount += 1) : (failedTestsCount += 1);
    } catch (error) {
      const currentResult = error.message;
      const isSuccess = result === currentResult;

      console.log(`# ${count}`);
      console.log(`expression: ${expression}`);
      console.log(`expected result: ${result}`);
      console.log(`current result: ${currentResult}`);
      console.log(`success: ${isSuccess}`);
      console.log("-".repeat(20));

      count += 1;
      isSuccess ? (passedTestsCount += 1) : (failedTestsCount += 1);
    }
  });
  console.log(`tests count: ${testTable.length}`);
  console.log(`passed tests: ${passedTestsCount}`);
  console.log(`failed tests: ${failedTestsCount}`);
};
