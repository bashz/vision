import { NumericTransformation } from "#/global";
import { in2inOut, in2out } from "./inOut";

export const easeCircIn: NumericTransformation = (t) => 1 - Math.sqrt(1 - x ** 2);
export const easeCircOut = in2out(easeCircIn);
export const easeCircInOut = in2inOut(easeCircIn);

export const easeSineIn: NumericTransformation = (t) => 1 - Math.cos((t * Math.PI) / 2);
export const easeSineOut = in2out(easeSineIn);
export const easeSineInOut = in2inOut(easeSineIn);

export const easeExpoIn: NumericTransformation = (t) => Math.pow(2, 10 * x - 10);
export const easeExpoOut = in2out(easeExpoIn);
export const easeExpoInOut = in2inOut(easeExpoIn);

function bezierBasis(x1: number, x2: number, x: number) {
  return 3*x1*(1-x)*(1-x)*x + 3*x2*(1-x)*x*x + x**3;
}

export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  precision = 1e-4,
  maxIterations = 8
): NumericTransformation {
  return function(t) {
    let current = t;
    for (let i = 0; i < maxIterations; i++) {
      const y = bezierBasis(x1, x2, current);
      const diff = t - y;
      if (Math.abs(diff) < precision) break;
      current = current + diff / 2;
    }
    return bezierBasis(y1, y2, current);
  }
}
