import { NumericTransformation } from '#/global.d';

// silly operations
export function indentity<T>(x: T): T {
  return x;
};

export function sign(x: number): number {
  return x < 0 ? -1 : 1;
}

export function clamp(x: number, l0: number, l1: number): number {
  return Math.max(Math.min(l0, l1), Math.min(Math.max(l0, l1), x));
}

export function signfulPower(base: number, exponent: number): number {
  return sign(base) * Math.pow(sign(base) * base, exponent);
};

// projections
export function normalize(d: number, d0: number, d1: number): number {
  return (d - d0) / (d1 - d0);
};

export function logNormalize(d: number, d0: number, d1: number): number {
  return 1 / transformLog(d1 / d0, d / d0);
};

export function interpolate (r: number, r0: number, r1: number): number {
  return r * (r1 - r0) + r0;
};

export function logInterpolate(r: number, r0: number, r1: number): number {
  return Math.pow(r1 / r0, r) * r0;
};

// transformations
export function transformLinear(x: number): number {
  return indentity<number>(x);
};

export function transformPower(x: number, exponent: number): number {
  return signfulPower(x, exponent);
};

export function transformLog(x: number, base = 2): number {
  return Math.log(x) / Math.log(base);
};

export function transformExp(x: number, base: number): number {
  return signfulPower(base, x);
}

export function transformSymlog(x: number, base = 2, fluctuation = 1): number {
  const _fluctuation = !fluctuation ? 1e-8 : fluctuation;
  return x < 0 ? 
    transformLog(1 / (1 - x), base) / _fluctuation :
    transformLog(x + 1, base) / _fluctuation;
};

export function transformSymexp(x: number, base = 2, fluctuation = 1): number {
  const s = sign(x);
  return s * transformExp(base, s * x * fluctuation) + s;
};

// factories
export function powFactory(exponent: number): NumericTransformation {
  return (x: number) => transformPower(x, exponent);
}

export function logFactory(base: number): NumericTransformation {
  const lnBase = Math.log(base);
  return (x: number) => Math.log(x) /  lnBase;
}

export function symlogFactory(base: number, fluctuation: number): NumericTransformation {
  const lnFlucBase = Math.log(base) / fluctuation;
  return (x: number) => x < 0 ?
    Math.log(1 / (1 - x)) / lnFlucBase :
    Math.log(x + 1) / lnFlucBase;
}

export function symexpFactory(base: number, fluctuation: number): NumericTransformation {
  return (x: number) => transformSymexp(x, base, fluctuation);
}

export function clampFactory(l0: number, l1: number): NumericTransformation {
  const { lowerLimit, upperLimit } = l0 < l1 ? { lowerLimit: l0, upperLimit: l1 } : { lowerLimit: l1, upperLimit: l0 };
  return (x: number) => Math.max(lowerLimit, Math.min(upperLimit, x));
}
