import { NumericTransformation } from "#/global";

function midSign(t: number): number {
  return 2 * Math.round(t) - 1;
}

export function in2out(fn: NumericTransformation): NumericTransformation {
  return (t: number) => (1 - fn(1 - t)); 
}

export const out2in = in2out;

export function out2inOut(fn: NumericTransformation): NumericTransformation {
  return (t: number) => {
    const sign =  midSign(t);
    return (1 + sign * fn(sign * (2 * t -1))) / 2;
  }
}

export function in2inOut(fn: NumericTransformation): NumericTransformation {
  return (t: number) => {
    const sign = midSign(t);
    return (1 + sign * (1 - fn(1 - (sign * (2 * t - 1))))) / 2;
  }
}
