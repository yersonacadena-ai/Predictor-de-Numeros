import { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import type { ImageRecognitionResponse } from "../types/ImageRecognitionResponse";
import ResultCard from "../components/ResultCard";

function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const [invert, setInvert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ImageRecognitionResponse | null>(null);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvert(e.target.checked);
  };

  const handleSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ image, invert });

    if (!image) {
      console.log("Debes seleccionar una imagen para enviar");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("invert", invert ? "true" : "false");
      formData.append("image", image);

      const URL =
        "http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict";
      const response = await fetch(URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error de servidor ${response.status}: ${text}`);
      }

      const data = (await response.json()) as ImageRecognitionResponse;
      console.log("API response:", data);

      setResult(data);

      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.unshift({
        timestamp: new Date().toISOString(),
        request: { imageName: image.name, invert: invert ? "true" : "false" },
        response: data,
      });
      localStorage.setItem("history", JSON.stringify(history));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="image" className="font-semibold">
              Imagen de 28x28
            </label>
            <input
              type="file"
              id="image"
              onChange={handleSend}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
            >
              Seleccionar imagen
            </label>
            <span className="text-gray-600 text-sm">
              {image ? image.name : "No se seleccionó ningún archivo"}
            </span>
          </fieldset>
          <fieldset className="flex items-center gap-2">
            <label htmlFor="checkbox" className="font-semibold">
              Invertir
            </label>
            <input type="checkbox" id="checkbox" onChange={handleChecked} />
          </fieldset>
          <button
            type="submit"
            disabled={!image || loading}
            className={`px-4 py-2 rounded font-semibold text-white transition ${
              !image || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-400 hover:bg-red-800"
            }`}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
      {result && <ResultCard result={result} />}
    </>
  );
}

export default HomePage;
