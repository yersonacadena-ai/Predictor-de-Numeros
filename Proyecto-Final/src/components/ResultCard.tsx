import type { ImageRecognitionResponse } from "../types/ImageRecognitionResponse";

interface ResultCardProps {
  result: ImageRecognitionResponse;
}

function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="mt-6 p-4 border-l-4 border-red-600 bg-blue-50 rounded">
      <h3 className="text-lg font-bold text-red-800 mb-2">
        Resultado de la predicción
      </h3>
      <p>
        <strong>Número predicho:</strong> {result.prediction}
      </p>
      <p>
        <strong>Precisión:</strong> {result.accuracy.toFixed(2)}%
      </p>
      <p>
        <strong>Tiempo de proceso:</strong> {result.process_time}
      </p>
    </div>
  );
}

export default ResultCard;
