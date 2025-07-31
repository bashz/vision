import { Transformation } from '#/global';
import { indentity } from '@/utils';
import Scale from '@/scales/Scale';

// In memory singleton to store all current animations
let animationIdx: number = 0;
export const animationMap = new Map<string, VizAnimation>();

export class VizAnimation {
  public id: string;
  private to: number;
  private duration: number;
  private onUpdate: Function;
  private start: number;
  private scale: Scale;

  constructor(
    from: number,
    to: number,
    duration = 1000,
    onUpdate: (v: number) => void,
    delay = 0,
    interpolate: Transformation<number> = indentity<number>
  ) {
    this.id = (++animationIdx).toString();
    this.to = to;
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.start = Date.now() + delay;
    // Add to the animations dict
    animationMap.set(this.id, this);
    this.scale = new Scale([0, duration], [from, to], interpolate);
  }

  update() {
    const elapsed = Date.now() - this.start;
    if (elapsed >= this.duration) {
      this.destroy(true);
    } else if (elapsed >= 0) {
      this.onUpdate(this.scale.scale(elapsed));
    }
  }

  destroy(shouldUpdate = false) {
    if (shouldUpdate) {
      this.onUpdate(this.to);
    }
    animationMap.delete(this.id);
  }

  /**
   * Endless loop to watch for animation updates to perform
   */
  static loopAnimation() {
    window.requestAnimationFrame(VizAnimation.loopAnimation);
    animationMap.forEach(animation => animation.update());
  }
}

const animate = (
  from: number,
  to: number,
  duration = 1000,
  delay = 0,
  interpolate: Transformation<number> = indentity<number>,
  onUpdate: (v: number) => void
) => {
  if (delay === 0 && duration === 0) {
    onUpdate(to);
    return () => {};
  }
  const animation = new VizAnimation(
    from,
    to,
    duration,
    onUpdate,
    delay,
    interpolate
  );
  return animation.destroy.bind(animation);
};

export default animate;

// Start animation loop
if (typeof window !== 'undefined') {
  VizAnimation.loopAnimation();
}
