export function mapResult(result: { id: string; success: boolean; attempts: number }[]): {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
} {
  const res = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };

  const keys = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

  for (const item of result) {
    let [id, win, times] = [item.id, item.success, item.attempts];
    if (win) {
      const index = Number(times) - 1;
      if (index >= 0 && index < keys.length) {
        res[keys[index]]++;
      }
    }
  }

  return res;
}
