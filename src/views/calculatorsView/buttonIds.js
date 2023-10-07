export const serviceButtonIds = [
  "(",
  ")",
  "back",
  "clear",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "equal",
  "3",
  "2",
  "1",
  "0",
  ".",
];

export const customButtonsIds = [
  "cos",
  "sin",
  "!",
  "^",
  "%",
  "/",
  "*",
  "-",
  "+",
];

export const getButtonsByIds = (buttonsIds, buttonConfigs) => {
  const buttons = new Map();
  buttonsIds.forEach((buttonId) => {
    const currentBututton = buttonConfigs.get(buttonId);
    if (!Boolean(currentBututton)) {
      throw new Error(`Button with id: <${buttonId}> doesn't exists`);
    }
    buttons.set(buttonId, currentBututton);
  });
  return buttons;
};
