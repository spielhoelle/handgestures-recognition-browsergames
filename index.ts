// @ts-ignore
import * as handTrack from './node_modules/handtrackjs/src/index.js';

(async () => {
	const defaultParams = {
		flipHorizontal: false,
		outputStride: 16,
		imageScaleFactor: 1,
		maxNumBoxes: 20,
		iouThreshold: 0.2,
		scoreThreshold: 0.6,
		modelType: "ssd320fpnlite",
		modelSize: "small",
		bboxLineWidth: "2",
		fontSize: 17,
	};

	const model = await handTrack.load(defaultParams)
	const video = document.getElementById('videoelement');
	const canvas = document.getElementById('result');
	if (video && canvas) {
		const ctx = (canvas as any).getContext("2d")
		handTrack.startVideo(video);
		video.addEventListener('loadeddata', async (event) => {
			setInterval(async () => {
				const predictions = await model.detect(video);
				console.log('predictions', predictions);
				model.renderPredictions(predictions, canvas, ctx, video);
			}, 100)
		});
	}
})()