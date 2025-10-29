import { identity } from '../../utils';
import { in2out, out2in, in2inOut, out2inOut } from './inOut';
import {
  easeCubicIn, easeCubicInOut, easeCubicOut,
  easeQuadIn, easeQuadInOut, easeQuadOut,
  easeQuartIn, easeQuartInOut, easeQuartOut,
  easeQuintIn, easeQuintInOut, easeQuintOut
} from './poly';
import {
  easeCircIn, easeCircInOut, easeCircOut,
  easeExpoIn, easeExpoInOut, easeExpoOut,
  easeSineIn, easeSineInOut, easeSineOut,
  cubicBezier
} from './extra';
import {
  easeBackIn, easeBackInOut, easeBackOut,
  easeBounceIn, easeBounceInOut, easeBounceOut,
  easeElasticIn, easeElasticInOut, easeElasticOut,
  back, bounce, elastic
} from './outbound';

export const easeLinear = identity<number>;

export {
  in2out, out2in, in2inOut, out2inOut,
  easeCubicIn, easeCubicInOut, easeCubicOut,
  easeQuadIn, easeQuadInOut, easeQuadOut,
  easeQuartIn, easeQuartInOut, easeQuartOut,
  easeQuintIn, easeQuintInOut, easeQuintOut,
  easeCircIn, easeCircInOut, easeCircOut,
  easeExpoIn, easeExpoInOut, easeExpoOut,
  easeSineIn, easeSineInOut, easeSineOut,
  easeBackIn, easeBackInOut, easeBackOut,
  easeBounceIn, easeBounceInOut, easeBounceOut,
  easeElasticIn, easeElasticInOut, easeElasticOut,
  back, bounce, elastic, linear, cubicBezier
};
