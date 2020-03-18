"use strict";
export {};

const Box = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Box(f(value)),
  fold: <S>(f: (value: T) => S) => f(value),
  inspect: () => `Box(${value})`,
});

// const dollarToFloat = (dollar: string) => {
//   const removedDollarSign = dollar.replace(/\$/g, "");
//   return parseFloat(removedDollarSign);
// };

const dollarToFloat = (dollar: string) =>
  Box(dollar)
    .map(dollar => dollar.replace(/\$/g, ""))
    .map(removedString => parseFloat(removedString));

// const percentToFloat = (percentageValue: string) => {
//   const removedPercentSign = percentageValue.replace(/%/g, "");
//   return parseFloat(removedPercentSign) * 0.01;
// };

const percentToFloat = (percentageValue: string) =>
  Box(percentageValue)
    .map(percentageValue => percentageValue.replace("/%/g", ""))
    .map(removedPercent => parseFloat(removedPercent))
    .map(float => float * 0.01);

// const applyDiscount = (price: string, discount: string) => {
//   const cost = dollarToFloat(price);
//   const saving = percentToFloat(discount);
//
//   return cost - cost * saving;
// };

const applyDiscount = (price: string, discount: string) =>
  dollarToFloat(price).fold(cost =>
    percentToFloat(discount).fold(saving => cost - cost * saving),
  );

const result = applyDiscount("$5.00$", "20%");

console.log(result);
