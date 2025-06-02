import { describe, expect, it } from 'vitest';
import { formatPrice } from '../utils/formatPrice.js';

interface typeInputOutput {
  input: number;
  output: string;
}

describe.each([
  {
    input: 2000,
    output: '20.00 €',
  },
  {
    input: 0,
    output: '0.00 €',
  },
])('format price', ({ input, output }: typeInputOutput) => {
  it(`test ${input} to equal ${output}`, () => {
    expect(formatPrice(input)).toBe(output);
  });
});
