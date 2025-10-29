import { ArrayOfTwoNumbers, Transformation } from '../../types/global.d';
import { transformLinear, normalize, interpolate } from '../utils';

export default class Scale {
  domain: ArrayOfTwoNumbers = [0, 1];
  range: ArrayOfTwoNumbers = [0, 1];
  transformation: Transformation<number> = transformLinear;
  reverseTransformation: Transformation<number> = transformLinear;

  constructor(domain?: ArrayOfTwoNumbers, range?: ArrayOfTwoNumbers, transformation?: Transformation<number>, reverseTransformation?: Transformation<number>) {
    domain && (this.domain = domain);
    range && (this.range = range);
    transformation && (this.transformation = transformation);
    reverseTransformation && (this.reverseTransformation = reverseTransformation);
  };

  scale (x: number) {
    return interpolate(
      this.transformation(
        normalize(
          x,
          this.domain[0],
          this.domain[1]
        )
      ),
      this.range[0],
      this.range[1]
    );
  };

  invert(y: number) {
    return interpolate(
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
