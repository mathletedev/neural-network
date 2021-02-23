const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
const dSigmoid = (x: number): number => x * (1 - x);

export { sigmoid, dSigmoid };
