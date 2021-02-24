import { sigmoid, derivative } from "./functions";

export default class Neuron {
	private numInputs: number;
	private weights: number[] = [];
	private bias: number = 0;
	private output: number = 0;
	private error: number = 0;

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

	public getWeights(): number[] {
		return this.weights;
	}

	public setWeights(weights: number[]): void {
		this.weights = weights;
	}

	public getError(): number {
		return this.error;
	}

	public setError(error: number): void {
		this.error = error;
	}

	public addError(error: number): void {
		this.error += error;
	}

	public adjust(prev: Neuron[], lr: number): void {
		const totalWeight: number = this.weights.reduce(
			(acc: number, curr: number) => acc + curr
		);
		for (let i: number = 0; i < this.weights.length; i++) {
			prev[i].addError((this.error * this.weights[i]) / totalWeight);
			const output: number = derivative(prev[i].getOutput());

			this.weights[i] +=
				(lr * this.error * this.weights[i] * output) / totalWeight;
		}

		this.bias += this.error * lr;
		this.error = 0;
	}
}
