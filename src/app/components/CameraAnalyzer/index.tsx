// components/CameraAnalyzer.js
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/Analyzer.module.css";

type CameraAnalyzerProps = {
  imageCaptured: string | null;
  setImageCaptured: (imageCaptured: string | null) => void;
};

export default function CameraAnalyzer({
  imageCaptured,
  setImageCaptured,
}: CameraAnalyzerProps) {
  const videoRef = useRef(null);
  // const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setImageCaptured(canvas.toDataURL("image/png"));
  };

  const analyzeImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageCaptured }),
      });

      if (!response.ok) throw new Error("Análise falhou");

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na análise. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.analyzerContainer}>
      <div className={styles.cameraWrapper}>
        <div className={styles.cameraContainer}>
          {!imageCaptured ? (
            <video
              className={styles.video}
              ref={videoRef}
              autoPlay
              playsInline
            />
          ) : (
            <img
              className={styles.capturedImage}
              src={imageCaptured}
              alt="Captured"
            />
          )}
          <button
            className={styles.captureButton}
            onClick={
              !imageCaptured ? captureImage : () => setImageCaptured(null)
            }
          />
        </div>
      </div>

      {/* {image && (
        <div className={styles.resultsContainer}>
          <h2>Resultados da Análise</h2>
          {loading ? (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner} />
            </div>
          ) : results ? (
            <ul>
              {results.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name} - {ingredient.description}</li>
              ))}
            </ul>
          ) : (
            <button
              onClick={analyzeImage}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Analisar Imagem
            </button>
          )}
        </div>
      )} */}
    </div>
  );
}
