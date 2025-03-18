"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface CameraProps {
  onCapture: (imageData: string) => void;
}

const CameraComponent: React.FC<CameraProps> = ({ onCapture }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });

      console.log(stream)
      
      streamRef.current = stream;
      console.log(videoRef.current)
      if (videoRef.current) {
       videoRef.current.srcObject = stream;
      }
      
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  }, []);

  useEffect(() => {
    if (isCameraOpen && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]); // Executa quando isCameraOpen muda
  

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      onCapture(imageData);
      stopCamera();
    }
  }, [onCapture, stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {!isCameraOpen && !capturedImage && (
        <button
          onClick={startCamera}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Camera size={24} />
          <span>Abrir Câmera</span>
        </button>
      )}

      {isCameraOpen && !capturedImage && (
        <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-300 aspect-square">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onLoadedMetadata={() => console.log('Vídeo carregado')}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              onClick={captureImage}
              className="bg-white rounded-full p-4 shadow-lg hover:bg-gray-100"
            >
              <div className="h-6 w-6 rounded-full bg-blue-600"></div>
            </button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-300 aspect-square">
            <Image
              src={capturedImage}
              alt="Imagem capturada"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button
            onClick={retakePhoto}
            className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Tirar outra foto
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;