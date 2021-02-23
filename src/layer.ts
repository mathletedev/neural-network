import Neuron from "./neuron";

export default class Layer {
	private neurons: Neuron[] = [];

	public constructor(inputs: Neuron[] | null, size: number) {
		for (let i = 0; i < size; i++) {
			let neuron: Neuron;
			if (inputs === null) neuron = new Neuron(0);
			else neuron = new Neuron(inputs);

			neuron.randomize();
			this.neurons.push(neuron);
		}
	}

	public getNeurons(): Neuron[] {
		return this.neurons;
	}

	public input(inputs: number[]): void {
		this.neurons.forEach((neuron: Neuron, i: number) =>
			neuron.setInput(inputs[i])
		);
	}

	public getOutputs(): number[] {
		return this.neurons.map((neuron: Neuron) => neuron.output());
	}
}
