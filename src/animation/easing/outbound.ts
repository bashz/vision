import { NumericTransformation } from "#/global";
import { in2inOut, in2out, out2in, out2inOut } from "./inOut";

const tau = Math.PI * 3 / 2;

export function bounce(bounces: number, amplitude: number): NumericTransformation {
  const a = amplitude + 0.5;
  const b = 12 - 8/(2**bounces);

  return (t: number) => {
    const r = Math.floor(4 - Math.log2(12 - b * t));
    // would the following allow cpu caching of c1 and c2?
    const c1 = 3 * (2**r - 1)/2**r;
    const c2 = (4**r - 1)/4**r;
    return (((b * t / 4) - c1)**2 + c2)**a;
  }
}

export const easeBounceOut = bounce(3, 0.5);
export const easeBounceIn = out2in(easeBounceOut);
export const easeBounceInOut = out2inOut(easeBounceOut);

export function elastic(bounces: number, amplitude: number): NumericTransformation {
  return (t: number) => Math.sin(Math.PI * t * (bounces + 0.5) + tau) * (1 - t)**(bounces/amplitude) + 1;
}

export const easeElasticOut = elastic(5, 2);
export const easeElasticIn = out2in(easeElasticOut);
export const easeElasticInOut = out2inOut(easeElasticOut);

export function back(overshoot: number): NumericTransformation {
  return (t: number) => overshoot * t ** 3 - (overshoot - 1) * t ** 2;
}

export const easeBackIn = back(Math.E);
export const easeBackOut = in2out(easeBackIn);
export const easeBackInOut = in2inOut(easeBackIn);

// export function elastic(bounces: number, amplitude: number): NumericTransformation {
//   return (t: number) => 1 - Math.abs(t + (1 + Math.cos(Math.PI + (t ** 4) * bounces * Math.PI)) * (1 - t) - 1);
// }