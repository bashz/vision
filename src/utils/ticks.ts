const { abs, max, log10, round } = Math;

const _nicesest = [1, 2, 5];
const _nices = [1, 2, 4, 5, 6, 8];

export function toDecimals(n: number, order: number): number {
  return +n.toFixed(abs(order));
}

export function generateTicks(start: number, end: number, amount = 10, nices = _nicesest): Array<number> {
  let _start = start;
  let _end = end;
  if (end < start) {
    _start = end;
    _end = start;
  }

  const range = abs(end - start);
  const order = round(log10(range) - 1);
  let nice = nices[0] || 1;
  let bestAmount = abs(range / (nice * 10 ** order) - amount);

  const ticks = [];
  for(let i = 1; i < nices.length; i++) {
    const tempAmount = abs(range / (nices[i] * 10 ** order) - amount);
    if (tempAmount < bestAmount) {
      nice = nices[i];
      bestAmount = tempAmount;
    }
  }

  const step = nice * 10 ** order;
  let mid = 0
  if ((start * end) > 0) mid = start + round(range / step) * step - (start % step);  

  let tick = mid;
  
  while (tick <= _end) {
    ticks.push(toDecimals(tick, order));
    tick += step;
  }
  tick = mid;
  while (tick >= _start) {
    tick -= step;
    ticks.unshift(toDecimals(tick, order));
  }

  if (end < start) ticks.reverse();
  return ticks.filter((n) => n >= _start && n <= _end);
}
