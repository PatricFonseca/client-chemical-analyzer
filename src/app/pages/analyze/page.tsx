"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CameraComponent from '../../components/Camera';
import { analyzeIngredient } from '../../api/analyze';
import { Loader2 } from 'lucide-react';

const AnalyzePage = () => {
  // const router = useRouter();
  const [imageData, setImageData] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageCapture = (capturedImage: string) => {
    setImageData(capturedImage);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!imageData) {
      setError('Por favor, capture uma imagem primeiro.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Chamada para sua API de análise
      const result = await analyzeIngredient(imageData);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Erro na análise:', err);
      setError('Ocorreu um erro durante a análise. Por favor, tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImageData(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <Layout title="Analisar Ingredientes">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Análise de Ingredientes</h1>
        
        {!analysisResult ? (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Capture uma imagem do ingrediente
            </h2>
            
            <CameraComponent onCapture={handleImageCapture} />
            
            {imageData && (
              <div className="mt-6">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Analisando...
                    </span>
                  ) : (
                    'Analisar Ingrediente'
                  )}
                </button>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resultado da Análise</h2>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-2">
                {analysisResult.name || "Ingrediente"}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Composição Nutricional:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Calorias: {analysisResult.calories || "N/A"}</li>
                    <li>Proteínas: {analysisResult.protein || "N/A"}</li>
                    <li>Carboidratos: {analysisResult.carbs || "N/A"}</li>
                    <li>Gorduras: {analysisResult.fat || "N/A"}</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Alergênicos:</p>
                  <p>{analysisResult.allergens?.join(', ') || "Nenhum detectado"}</p>
                </div>
                
                <div>
                  <p className="font-medium">Benefícios à saúde:</p>
                  <p>{analysisResult.healthBenefits || "Informação não disponível"}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetAnalysis}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Analisar Outro Ingrediente
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AnalyzePage;