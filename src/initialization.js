import {
  testModel,
  customButtons,
  serviceButtons,
  CalculatorController,
  getViewImplementation,
  getModelImplementation,
} from "./index";
import * as dotenv from "dotenv";

dotenv.config();

const ModelImplementation = getModelImplementation();
const ViewImplementation = getViewImplementation();

export const startInitialization = () => {
  const model = new ModelImplementation(customButtons);
  const view = new ViewImplementation(customButtons, serviceButtons);
  const controller = new CalculatorController(model, view);
  controller.bindHandlers();
  testModel(model);
  view.render();
};
