import { CalculatorModel } from "./index";

const implementationName = process.env.MODEL_IMPLEMENTATION_NAME;
const modelImplementations = new Map([["calculatorModel", CalculatorModel]]);

const getModelImplementationByName = (name) => {
  const implementation = modelImplementations.get(name);

  if (!Boolean(implementation)) {
    throw new Error(`Implementation with name: <${name}> not found`);
  }

  return implementation;
};

export const getModelImplementation = () =>
  getModelImplementationByName(implementationName);
