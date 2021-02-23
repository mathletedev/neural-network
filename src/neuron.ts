export default class Neuron {
	private inputs: Neuron[] | number;
	private weights: number[] = [];
	private bias: number = 0;

	public constructor(inputs: Neuron[] | number) {
		this.inputs = inputs;
	}

	public setInput(input: number): void {
		this.inputs = input;
	}

	public randomize(): void {
		if (typeof this.inputs !== "number")
			this.weights = Array.from({ length: this.inputs.length }, () =>
				Math.random()
			);
		this.bias = Math.random();
	}

	public output(): number {
		if (typeof this.inputs === "number") return this.inputs + this.bias;
		return (
			this.inputs
				.map((neuron: Neuron) => neuron.output())
				.reduce(
					(acc: number, curr: number, i: number) =>
						(acc + curr) * this.weights[i]
				) + this.bias
		);
	}
}
