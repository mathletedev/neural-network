import Neuron from "./neuron";
import Layer from "./layer";

export default class NeuralNetwork {
	private layers: Layer[] = [];

	public constructor(...sizes: number[]) {
		for (let i = 0; i < sizes.length; i++) {
			this.layers.push(
				new Layer(i === 0 ? null : this.layers[i - 1].getNeurons(), sizes[i])
			);
		}
	}

	public predict(inputs: number[]): number[] {
		this.layers[0].input(inputs);

		return this.layers[this.layers.length - 1].getOutputs();
	}
}
