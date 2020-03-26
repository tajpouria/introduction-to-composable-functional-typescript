export {};

// console.log("foo".concat("bar".concat("baz")));

const Sum = (value: number) => ({
  value,
  concat: ({ value: otherValue }: ReturnType<typeof Sum>) =>
    Sum(value + otherValue),
  inspect: () => `Sum(${value})`,
});

const sum = Sum(1)
  .concat(Sum(2).concat(Sum(3)))
  .inspect();

// console.log(sum)

const All = (value: boolean) => ({
  value,
  concat: ({ value: otherValue }: ReturnType<typeof All>) =>
    All(value && otherValue),
  inspect: () => `All(${value})`,
});

const all = All(true)
  .concat(All(true).concat(All(false)))
  .inspect();

// console.info(all);

const First = <T>(value: T) => ({
  value,
  concat: (_: ReturnType<typeof First>) => First(value),
  inspect: () => `First(${value})`,
});

const f = First("metaProgramming")
  .concat("bar")
  .inspect();

// console.info(f);

interface ConcatAble {
  concat<T extends ConcatAble>(c: T): ConcatAble;
  inspect?(): string;
}

const cMap = (data: Record<string, ConcatAble>) => ({
  data,
  concat: ({ data: otherData }: ReturnType<typeof cMap>) => {
    // return an object that contain properties of both object if props is concatAble go ahead and concat them other wise just include the property
    const resObj = { ...otherData };

    Object.keys(data).forEach(key => {
      const currentObjVal = data[key];

      const otherObjEqVal = otherData[key];

      if (otherObjEqVal) {
        resObj[key] = currentObjVal.concat(otherObjEqVal);
      } else {
        resObj[key] = currentObjVal;
      }
    });

    return cMap(resObj);
  },
  inspect: () => {
    const resInspect = Object.values(data).map(item =>
      item.inspect ? item.inspect() : JSON.stringify(item),
    );

    return `cMap(${resInspect})`;
  },
});

const p1 = cMap({
  name: First("Nik"),
  isPaid: All(true),
  points: Sum(1),
  friends: ["Franklin"],
});

const p2 = cMap({
  name: First("Nik"),
  isPaid: All(false),
  points: Sum(2),
  friends: ["Gatsby"],
});

const eg = p1.concat(p2).inspect();

console.log(eg);
