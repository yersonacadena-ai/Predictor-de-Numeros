import { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import type { HistoryItem } from "../types/HistoryItem";
import HistoryCard from "../components/HistoryCard";

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history") || "[]");
    console.log("Historial cargado", saved);
    setHistory(saved);
  }, []);
  const handleClear = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };
  return (
    <>
      <HeaderComponent />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Historial De Predicciones
        </h2>
        {history.length === 0 ? (
          <p className="text-gray-600">no hay predicciones guardadas</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item, index) => (
              <HistoryCard key={index} item={item} />
            ))}
          </ul>
        )}
        {history.length > 0 && (
          <button
            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
            onClick={handleClear}
          >
            Limpiar Historial
          </button>
        )}
      </div>
    </>
  );
}

export default HistoryPage;
