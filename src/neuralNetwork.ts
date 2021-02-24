import Neuron from "./neuron";
import Layer from "./layer";

export default class NeuralNetwork {
	private layers: Layer[] = [];
	private lr: number;

	public constructor(sizes: number[], lr: number) {
		for (let i = 0; i < sizes.length; i++)
			this.layers.push(new Layer(sizes[i], i === 0 ? 0 : sizes[i - 1]));
		this.lr = lr;
	}

	public predict(inputs: number[]): number[] {
		this.layers[0].input(inputs);

		for (let i: number = 1; i < this.layers.length; i++) {
			this.layers[i].inputAll(this.layers[i - 1].getOutputs());
		}

		return this.layers[this.layers.length - 1].getOutputs();
	}

	public train(
		inputs: number[],
		targets: number[],
		data: number | null = null
	): void {
		let outputs: number[] = this.predict(inputs);
		if (data !== null) {
			console.log(`${data} | Outputs: ${outputs}`);
			console.log(`${data} | Targets: ${targets}`);
		}

		const errors: number[] = outputs.map(
			(out: number, i: number) => targets[i] - out
		);
		if (data !== null) console.log(`${data} | Errors: ${errors}`);

		this.layers[this.layers.length - 1].setErrors(errors);

		for (let i: number = this.layers.length - 1; i >= 1; i--) {
			let layer: Layer = this.layers[i];
			const prev: Neuron[] = this.layers[i - 1].getNeurons();

			layer
				.getNeurons()
				.forEach((neuron: Neuron) => neuron.adjust(prev, this.lr));
		}
	}
}
