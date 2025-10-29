import { NumericTransformation } from "#/global";
import { in2out, in2inOut } from "./inOut";

export function poly(exponent: number): NumericTransformation {
  return (t: number) => t ** exponent;
}

export const easeQuadIn = poly(2);
export const easeQuadOut = in2out(easeQuadIn);
export const easeQuadInOut = in2inOut(easeQuadIn);

export const easeCubicIn = poly(3);
export const easeCubicOut = in2out(easeCubicIn);
export const easeCubicInOut = in2inOut(easeCubicIn);

export const easeQuartIn = poly(4);
export const easeQuartOut = in2out(easeQuartIn);
export const easeQuartInOut = in2inOut(easeQuartIn);

export const easeQuintIn = poly(5);
export const easeQuintOut = in2out(easeQuintIn);
export const easeQuintInOut = in2inOut(easeQuintIn);
