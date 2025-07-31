import {
  indentity, sign, clamp, signfulPower, normalize, interpolate, logNormalize, logInterpolate,
  transformLinear, transformExp, transformLog, transformPower, transformSymexp, transformSymlog,
  logFactory, powFactory, symlogFactory, symexpFactory, clampFactory
} from '../'
describe('Math functions', () => {
  describe('identity', () => {
    it('should return the input', () => {
      const stringOutput = indentity<string>('3');
      expect(stringOutput).toBe('3');
      const numberOutput = indentity<number>(4);
      expect(numberOutput).toBe(4);
    })
  })

  describe('sign', () => {
    it('should return the sign of number', () => {
      const positive = sign(30.2);
      expect(positive).toBe(1);
      const negative = sign(-42);
      expect(negative).toBe(-1);
    })

    it('should treat 0 and NaN as positive', () => {
      const zeroSign = sign(0);
      expect(zeroSign).toBe(1);
      const nanSign = sign(NaN);
      expect(nanSign).toBe(1);
    })

    it('should resolve for inifinit value', () => {
      const psoitive = sign(Infinity);
      expect(psoitive).toBe(1);
      const negative = sign(-Infinity);
      expect(negative).toBe(-1);
    })
  })

  describe('clamp', () => {
    it('limit a value within a range', () => {
      expect(clamp(15, 10, 20)).toBe(15);
      expect(clamp(5, 10, 20)).toBe(10);
      expect(clamp(25, 10, 20)).toBe(20);
    })

    it('limit a value according to a range direction', () => {
      expect(clamp(15, 20, 10)).toBe(15);
      expect(clamp(5, 20, 10)).toBe(10);
      expect(clamp(25, 20, 10)).toBe(20);
    })

    it('does not clamp NaN and it returns it as it is', () => {
      expect(clamp(NaN, 10, 20)).toBe(NaN);
    })
  })

  describe('signfulPower', () => {
    it('should output x^y changing sign according to x', () => {
      expect(signfulPower(4, 4)).toBe(256);
      expect(signfulPower(-4, 4)).toBe(-256);
      expect(signfulPower(2, -2)).toBe(0.25);
      expect(signfulPower(-2, -2)).toBe(-0.25);
    })
  })

  describe('normalize', () => {
    it('should normalize a value to [0, 1] range', () => {
      const half = normalize(100, 50, 150);
      expect(half).toBe(0.5);
      const quarter = normalize(0, -100, 300);
      expect(quarter).toBe(0.25);
      const fifth = normalize(-90, -100, -50);
      expect(fifth).toBe(0.2);
      const same = normalize(0.651999, 0, 1);
      expect(same).toBe(0.651999);
    })

    it('outputs according to range direction', () => {
      const quarter = normalize(0, -30, 90);
      expect(quarter).toBe(0.25);
      const threeQuarters = normalize(0, 90, -30);
      expect(threeQuarters).toBe(0.75);
    })

    it('can return out of [0, 1] range values', () => {
      const oneAndHalf = normalize(15, 0, 10);
      expect(oneAndHalf).toBe(1.5);
      const minusHalf = normalize(5, 10, 20);
      expect(minusHalf).toBe(-0.5);
    })
  })

  describe('interpolate', () => {
    it('projects a value from [0, 1] range to a new given range', () => {
      expect(interpolate(0.5, -50, 150)).toBe(50);
      expect(interpolate(0.4, 100, 200)).toBe(140);
    })

    it('respects the given range direction', () => {
      expect(interpolate(0.3, -50, 50)).toBe(-20);
      expect(interpolate(0.3, 50, -50)).toBe(20);
    })

    it('can project out of the given range', () => {
      expect(interpolate(1.2, 0, 100)).toBe(120);
      expect(interpolate(-0.5, 0, 100)).toBe(-50);
    })
  })

  describe('transformLog', () => {
    it('should return log2 x', () => {
      expect(transformLog(8)).toBeCloseTo(3);
      expect(transformLog(Math.sqrt(2))).toBeCloseTo(0.5);
    })

    it('should return logB x', () => {
      expect(transformLog(9, 3)).toBeCloseTo(2);
      expect(transformLog(1000, 10)).toBeCloseTo(3);
    })
  })

  describe('logNormalize', () => {
    it('should normalize a value to [0, 1] range', () => {
      const half = logNormalize(32, 0.25, 4096);
      expect(half).toBe(0.5);
      const zero = logNormalize(1, 1, 10);
      expect(zero).toBe(0);
      const one = logNormalize(10, 1, 10)
      expect(one).toBe(1);
    })

    it('outputs according to range direction', () => {
      const quarter = logNormalize(10, 1, 10000);
      expect(quarter).toBe(0.25);
      const threeQuarters = logNormalize(10, 10000, 1);
      expect(threeQuarters).toBe(0.75);
    })

    it('can return out of [0, 1] range values', () => {
      const two = logNormalize(100, 1, 10);
      expect(two).toBe(2);
      const minusOne = logNormalize(0.1, 1, 10);
      expect(minusOne).toBeCloseTo(-1, 10);
    })
  })

  describe('logInterpolate', () => {
    it('should interpolate a value from [0, 1] range', () => {
      expect(logInterpolate(0.5, 0.25, 4096)).toBe(32);
      const one = logInterpolate(0, 1, 10);
      expect(one).toBe(1);
      const ten = logInterpolate(1, 1, 10)
      expect(ten).toBe(10);
    })

    it('outputs according to range direction', () => {
      const ten = logInterpolate(0.25, 1, 10000);
      expect(ten).toBe(10);
      const thousand = logInterpolate(0.25, 10000, 1);
      expect(thousand).toBe(1000);
    })

    it('can return a value out of the range values', () => {
      const hundred = logInterpolate(2, 1, 10);
      expect(hundred).toBe(100);
      const pointOne = logInterpolate(-1, 1, 10);
      expect(pointOne).toBeCloseTo(0.1);
    })
  })

  describe('transformLinear', () => {
    it('should return the input', () => {
      expect(transformLinear(1.962623)).toBe(1.962623);
    })
  })

  describe('transformPower', () => {
    it('should output x^exponent', () => {
      expect(transformPower(2, 4)).toBe(16);
      expect(transformPower(3, 2)).toBe(9);
    })

    it('should change the output sign according to the input sign', () => {
      expect(transformPower(-2, 2)).toBe(-4);
      expect(transformPower(-2, 3)).toBe(-8);
      expect(transformPower(-4, 0.5)).toBe(-2);
    })
  })

  describe('transformExp', () => {
    it('should output base^x', () => {
      expect(transformExp(2, 4)).toBe(16);
      expect(transformExp(3, 2)).toBe(8);
    })

    it('should change the output sign according to the input sign', () => {
      expect(transformExp(2, -2)).toBe(-4);
      expect(transformExp(-2, -2)).toBe(-0.25);
      expect(transformExp(0.5, -144)).toBe(-12);
    })
  })

  describe('transformSymexp', () => {
    it('should return 1 + x² for positive inputs', () => {
      expect(transformSymexp(0.5)).toBe(1.25);
      expect(transformSymexp(2)).toBe(5);
      expect(transformSymexp(3)).toBe(10);
    })

    it('should return negative counterpart for negative inputs', () => {
      expect(transformSymexp(-0.5)).toBe(-1.25);
      expect(transformSymexp(-3)).toBe(-10);
      expect(transformSymexp(-7)).toBe(-transformSymexp(7));
    })

    it('should changes according to log base', () => {
      expect(transformSymexp(3, 3)).toBe(28);
      expect(transformSymexp(-3, 3)).toBe(-28);
    })

    it('should always return 1 when input is 0', () => {
      expect(transformSymexp(0)).toBe(1);
      expect(transformSymexp(0, 10)).toBe(1);
      expect(transformSymexp(0, 0.1)).toBe(1);
      expect(transformSymexp(0, 10, 2)).toBe(1);
      expect(transformSymexp(0, 10, -2000)).toBe(1);
      expect(transformSymexp(0, 10, 0)).toBe(1);
    })

    it('can fluctuate the output near 0', () => {
      expect(transformSymexp(1, 2, 1)).toBe(2);
      expect(transformSymexp(1, 2, 2)).toBe(5); // 2² + 1
      expect(transformSymexp(1, 2, 4)).toBe(17); // 4² + 1
      expect(transformSymexp(2, 10, 1)).toBe(1025); // 2^10 + 1
      expect(transformSymexp(4, 10, 2)).toBe(1073741825); // 4^10 * 2^10 + 1
    })

    it('still output when the fluctuation is 0, near 1 numbers returned', () => {
      expect(transformSymexp(1, 2, 0)).toBe(1);
      expect(transformSymexp(99, 10, 0)).toBe(1);
    })
  })

  describe('transformSymlog', () => {
    it('should return log2 (x + 1) for positive inputs', () => {
      expect(transformSymlog(Math.sqrt(0.175))).toBeCloseTo(0.5);
      expect(transformSymlog(3)).toBe(2);
      expect(transformSymlog(15)).toBe(4);
    })

    it('should return negative counterpart for negative inputs', () => {
      expect(transformSymlog(-Math.sqrt(0.175))).toBeCloseTo(-transformSymlog(Math.sqrt(0.175)));
      expect(transformSymlog(-3)).toBe(-transformSymlog(3));
      expect(transformSymlog(-4, 4, 4)).toBe(-transformSymlog(4, 4, 4));
    })

    it('should changes according to log base', () => {
      expect(transformSymlog(8, 3)).toBeCloseTo(2);
      expect(transformSymlog(-8, 3)).toBeCloseTo(-2);
    })

    it('should always return 0 when input is 0', () => {
      expect(transformSymlog(0)).toBe(0);
      expect(transformSymlog(0, 10)).toBe(0);
      expect(transformSymlog(0, 0.1)).toBeCloseTo(0);
      expect(transformSymlog(0, 10, 2)).toBe(0);
      expect(transformSymlog(0, 10, -2000)).toBeCloseTo(0);
      expect(transformSymlog(0, 10, 0)).toBe(0);
    })

    it('can fluctuate the output near 0', () => {
      expect(transformSymlog(1, 2, 1)).toBe(1);
      expect(transformSymlog(1, 2, 2)).toBe(0.5); // transformSymlog(1, 2, 1) * 0.5
      expect(transformSymlog(1, 2, 4)).toBe(0.25); // transformSymlog(1, 2, 1) * 0.25
      expect(transformSymlog(99, 10, 1)).toBe(2);
      expect(transformSymlog(99, 10, 2)).toBe(1); // transformSymlog(99, 10, 1) * 0.5
    })

    it('still output when the fluctuation is 0, huge number returned', () => {
      expect(transformSymlog(1, 2, 0)).toBe(1e8); // transformSymlog(1, 2, 1) * 1e8
      expect(transformSymlog(99, 10, 0)).toBe(2e8); // transformSymlog(1, 2, 1) * 2e8
    })
  })
})
