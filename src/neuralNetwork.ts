import Neuron from "./neuron";
import Layer from "./layer";

export default class NeuralNetwork {
	private layers: Layer[] = [];

	public constructor(sizes: number[]) {
		for (let i = 0; i < sizes.length; i++) {
			this.layers.push(new Layer(sizes[i], i === 0 ? 0 : sizes[i - 1]));
		}
	}

	public predict(inputs: number[]): number[] {
		this.layers[0].input(inputs);

		for (let i: number = 1; i < this.layers.length; i++) {
			this.layers[i].inputAll(this.layers[i - 1].getOutputs());
		}

		return this.layers[this.layers.length - 1].getOutputs();
	}
}
