import Neuron from "./neuron";

export default class Layer {
	private neurons: Neuron[] = [];

	public constructor(size: number, prevSize: number) {
		for (let i: number = 0; i < size; i++) {
			let neuron: Neuron = new Neuron(prevSize);
			neuron.randomize();
			this.neurons.push(neuron);
		}
	}

	public getNeurons(): Neuron[] {
		return this.neurons;
	}

	public input(inputs: number[]): void {
		this.neurons.forEach((neuron: Neuron, i: number) =>
			neuron.input(inputs[i])
		);
	}

	public inputAll(inputs: number[]): void {
		this.neurons.forEach((neuron: Neuron, i: number) => neuron.input(inputs));
	}

	public getOutputs(): number[] {
		return this.neurons.map((neuron: Neuron) => neuron.getOutput());
	}

	public setErrors(errors: number[]): void {
		for (let i = 0; i < this.neurons.length; i++) {
			this.neurons[i].setError(errors[i]);
		}
	}
}
