import { ArrayOfTwoNumbers, Transformation } from '../../types/global.d';
import { normalize, interpolate, logNormalize, logInterpolate } from '../utils';
import Scale from './Scale';

export default class LogScale extends Scale {
  base = 10;

  constructor(domain?: ArrayOfTwoNumbers, range?: ArrayOfTwoNumbers, base?: number, transformation?: Transformation<number>, reverseTransformation?: Transformation<number>) {
    super(domain, range, transformation, reverseTransformation);
    base && (this.base = base);
  };

  scale (x: number) {
    return interpolate(
      this.transformation(
        logNormalize(
          x,
          this.domain[0],
          this.domain[1]),
      ),
      this.range[0],
      this.range[1]
    );
  };

  invert(y: number) {
    return logInterpolate(
      this.reverseTransformation(
        normalize(
          y,
          this.range[0],
          this.range[1]
        )
      ),
      this.domain[0],
      this.domain[1]
    );
  };
};