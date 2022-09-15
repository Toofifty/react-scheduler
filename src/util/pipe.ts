export const pipe =
  <T>(x: T) =>
  (...fns: ((v: T) => T)[]) =>
    fns.reduce((v, f) => f(v), x);

export const pipable =
  <T, A extends any[]>(fn: (x: T, ...args: A) => T) =>
  (...args: A) =>
  (x: T) =>
    fn(x, ...args);
