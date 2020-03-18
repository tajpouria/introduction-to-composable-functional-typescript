"use strict";
export {};
/*
const nextCharFromNumberString = str => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
}
*/

// const nextCharFromNumberString = (str: string): string => String.fromCharCode((parseInt(str.trim())) + 1);

// const nextCharFromNumberString = (str: string): string => [str]
//     .map(s => s.trim())
//     .map(t => parseInt(t))
//     .map(n => n + 1)
//     .map(n => String.fromCharCode(n))
//     .pop()

const Box = <T>(x: T) => ({
  map: (f: (x: T) => any) => Box(f(x)),
  fold: (f: (x: T) => any) => f(x),
  inspect: () => `Box(${x})`,
});

const nextCharFromNumberString = (str: string) =>
  Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(n => n + 1)
    .fold(n => String.fromCharCode(n));

const result = nextCharFromNumberString("  64");

console.log(result);
