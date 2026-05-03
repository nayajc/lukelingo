export function normalizeKorean(s: string): string {
  // eslint-disable-next-line no-useless-escape
  return s.replace(/[\s.,!?;:'"()\[\]{}\-]/g, '').trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export function isKoreanMatch(input: string, answer: string): boolean {
  const a = normalizeKorean(input);
  const b = normalizeKorean(answer);
  if (a === b) return true;
  const tolerance = Math.max(1, Math.ceil(b.length * 0.2));
  return levenshtein(a, b) <= tolerance;
}
