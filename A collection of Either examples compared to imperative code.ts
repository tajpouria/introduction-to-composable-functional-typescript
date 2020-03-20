const Right = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Right(f(value)),
  chain: <S>(f: (value: T) => S) => f(value),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => g(value),
});

const Left = <T>(value: T) => ({
  map: <S>(f: (value: T) => S) => Left(value),
  chain: <S>(f: (value: T) => S) => Left(value),
  fold: <S>(f: (value: T) => S, g: (value: T) => S) => f(value),
});

const fromNullable = <T>(value: T) => {
  const res = value ?? null;
  return res === null ? Left(res) : Right(res);
};

const tryCatch = <T>(f: () => T) => {
  try {
    return Right(f());
  } catch (error) {
    return Left(error);
  }
};

// Examples

/*
const openSite = (currentUser: any) =>
  currentUser ? console.info(currentUser) : console.error('Not logged in');
*/

const openSite = (currentUser: any) =>
  fromNullable(currentUser).fold(
    () => console.error("Not logged in"),
    user => console.info(user),
  );

/*
const loadUserPrefs = (user: any) => {
  if (user.isPremium) return console.info(user.prefs);

  return console.error('Not premium');
};
*/

const loadUserPrefs = (user: any) =>
  (user.isPremium ? Right(user) : Left("Not premium"))
    //@ts-ignore
    .map(user => user.prefs)
    .fold(
      msg => console.error(msg),
      user => console.info(user.prefs),
    );

/*
const getStreetName = (user: any) => {
	const address = user.address;
	if(address){
		const st = address.street;
		if(st) return st.name;
	}

 return 'No Street'
};
*/

const getStreetName = (user: any) =>
  fromNullable(() => user.address)
    //@ts-ignore
    .chain(address => fromNullable(() => address.st))
    .map(st => st.name)
    .fold(
      msg => console.error(msg),
      stName => stName,
    );

/*
const concatUnique = (x: string[], ys: string[]) => {
  const found = ys.filter(item => item === x)[0];

  return !found ? ys.concat(x) : ys;
};
*/

import * as fs from "fs";

const concatUnique = (x: string, ys: string[]) =>
  fromNullable(ys.filter(item => item === x)[0]).fold(
    () => ys.concat(x),
    () => ys,
  );

/*
const wrapExample = (example: any) => {
  const pp = example.previewPath;
  if (pp) {
    try {
      example.preview = fs.readFileSync(pp, 'UTF-8');
    } catch (error) {}
  }
};
*/

const wrapExample = (example: any) =>
  fromNullable(example.previewPath)
    //@ts-ignore
    .chain(pp => tryCatch(() => fs.readFileSync(pp, "UTF-8")))
    .fold(
      error => {},
      data => (example.preview = data),
    );

/*
const parseDbUrl = (cfg: string) => {
  try {
    const c = JSON.parse(cfg);

		if(c.url){
			return c.url.replace(/\-/g, "_");
		}
  } catch (error) {
    console.error(error);
  }
};
*/

const parseDbUrl = (cfg: string) =>
  tryCatch(JSON.parse(cfg))
    // @ts-ignore
    .chain(cfg => fromNullable(cfg.url))
    .fold(
      error => console.error(error),
      url => url.replace(/\-/g),
      "_",
    );

