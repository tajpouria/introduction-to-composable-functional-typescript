"use strict";

export {};

/*
const Right = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Right(f(value)),
  fold: <S, K>(f: (value: T) => S, g: (value: T) => K) => g(value),
  inspect: () => `Right(${value})`,
});

const Left = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Left(value),
  fold: <S, K>(f: (value: T) => S, g: (value: T) => K) => f(value),
  inspect: () => `Left(${value})`,
});

const result = Right(4)
  .map(value => value / 2)
  .fold(
    value => `LeftFolded: ${value}`,
    value => `RightFolded: ${value}`,
  );
 */

const Right = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Right(f(value)),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => g(value),
});

const Left = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Left(value),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => f(value),
});

const fromNullable = (x: any) => (x != null ? Right(x) : Left(x));

const colorPicker = (name: string) =>
  fromNullable({ black: "#000000", white: "#ffffff" }[name]);

const color = colorPicker("green")
  .map(pickedColor => pickedColor.slice(1))
  .map(slicedColor => slicedColor.toUpperCase())
  .fold(
    () => null,
    targetColor => targetColor,
  );

console.log(color);
