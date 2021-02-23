import { sigmoid } from "./functions";

export default class Neuron {
	private numInputs: number;
	private weights: number[] = [];
	private bias: number = 0;
	private output: number = 0;

	public constructor(numInputs: number) {
		this.numInputs = numInputs;
	}

	public input(inputs: number[] | number): void {
		if (typeof inputs === "number") {
			this.output = inputs + this.bias;
			return;
		}
		this.output = sigmoid(
			inputs.reduce(
				(acc: number, curr: number, i: number) => (acc + curr) * this.weights[i]
			)
		);
	}

	public randomize(): void {
		this.weights = Array.from(
			{ length: this.numInputs },
			() => Math.random() * 2 - 1
		);
		this.bias = Math.random() * 2 - 1;
	}

	public getOutput(): number {
		return this.output;
	}
}
