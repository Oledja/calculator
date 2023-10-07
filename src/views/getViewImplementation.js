import { CalculatorView } from "./index";

const implementationName = process.env.VIEW_IMPLEMENTATION_NAME;

const CalculatorViewImplementations = {
  CALCULATOR_VIEW: "calculatorView",
};

const viewImplementations = new Map([["calculatorView", CalculatorView]]);

const getViewImplementationByName = (name) => {
  const implementation = viewImplementations.get(name);

  if (!Boolean(implementation)) {
    throw new Error(`Implementation with name: <${name}> not found`);
  }

  return implementation;
};

export const getViewImplementation = () =>
  getViewImplementationByName(implementationName);
