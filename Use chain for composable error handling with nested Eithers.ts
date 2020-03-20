export {};

import * as fs from "fs";

const Right = <T>(value: T) => ({
  chain: <S>(f: (value: T) => S) => f(value),
  map: <S>(f: (value: T) => S) => Right(f(value)),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => g(value),
});

const Left = <T>(value: T) => ({
  chain: <S>(f: (value: T) => S) => Left(value),
  map: <S>(f: (value: T) => S) => Left(value),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => f(value),
});

// const getPort = () => {
//   try {
//     const data = fs.readFileSync("./config.json", "UTF-8");
//     return +JSON.parse(data).port;
//   } catch (error) {
//     return 3000;
//   }
// };

const tryCatch = <T>(f: () => T) => {
  try {
    return Right(f());
  } catch (error) {
    return Left(<Error>error);
  }
};

const getPort = () =>
  tryCatch(() => fs.readFileSync("./config.json", "UTF-8")) // Left(error) | Right(data)
    // @ts-ignore Todo: Not exactly get it
    .chain(data => tryCatch(() => JSON.parse(data)))
    .fold(
      error => 3000,
      data => parseInt(data.port),
    );

const res = getPort();

console.info(res);
