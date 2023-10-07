export const INITIAL_VALUE = "0";
export const numberRegExp = "(?<!\\d)-?\\d+(\\.?\\d+)?(e(\\+|\\-)\\d{1,3})?";
export const onlyPositiveNumber = "\\d+(\\.?\\d+)?(e(\\+|\\-)\\d{1,3})?";
export const onlyDigits = /^\-?\d+\.?\d+$/;
export const spaceRegExp = /\s+/g;
export const bracketsRegExp = /\(([^()]+)\)/;
export const incorrectBracketsRegExp = /\(|\)/;
export const incorrectDotRegExp =
  /\.\(|\)\.|\.\(|\(\.|\.\)|\D\.|\.\D|\d+\.\d+\./;
export const incorecrPlaceForNumber = /\d\(|\)\d/;
