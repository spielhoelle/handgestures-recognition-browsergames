var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import * as handTrack from './node_modules/handtrackjs/src/index.js';
(() => __awaiter(void 0, void 0, void 0, function* () {
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
    const model = yield handTrack.load(defaultParams);
    const video = document.getElementById('videoelement');
    const canvas = document.getElementById('result');
    if (video && canvas) {
        const ctx = canvas.getContext("2d");
        handTrack.startVideo(video);
        video.addEventListener('loadeddata', (event) => __awaiter(void 0, void 0, void 0, function* () {
            setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                const predictions = yield model.detect(video);
                console.log('predictions', predictions);
                model.renderPredictions(predictions, canvas, ctx, video);
            }), 100);
        }));
    }
}))();
