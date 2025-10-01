import type { HistoryItem } from "../types/HistoryItem";

interface HistoryCardProps {
  item: HistoryItem;
}

function HistoryCard({ item }: HistoryCardProps) {
  return (
    <li className="p-4 border rounded bg-gray-50 shadow-sm">
      <p>
        <strong>Archivo:</strong> {item.request.imageName}
      </p>
      <p>
        <strong>Invertido:</strong> {item.request.invert}
      </p>
      <p>
        <strong>Predicción:</strong> {item.response.prediction}
      </p>
      <p>
        <strong>Precisión:</strong> {item.response.accuracy.toFixed(2)}%
      </p>
      <p>
        <strong>Tiempo:</strong> {item.response.process_time}
      </p>
      <p>
        <strong>Fecha:</strong> {new Date(item.timestamp).toLocaleString()}
      </p>
    </li>
  );
}

export default HistoryCard;
