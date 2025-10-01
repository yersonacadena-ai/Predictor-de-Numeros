import type { ImageRecognitionResponse } from "./ImageRecognitionResponse";
export interface HistoryItem {
  timestamp: string;
  request: {
    imageName: string;
    invert: string;
  };
  response: ImageRecognitionResponse;
}
