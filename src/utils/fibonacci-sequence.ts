export default function fibonacciSequence(length: number) {
  if (length <= 0) return [];
  if (length === 1) return [1];
  if (length === 2) return [1, 1];

  const sequence = [1, 1];
  for (let i = 2; i < length; i++) {
    const nextNumber = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextNumber);
  }

  return sequence;
}