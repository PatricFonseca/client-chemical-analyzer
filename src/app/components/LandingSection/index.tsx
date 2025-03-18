import { useRef } from "react";
import { Button } from "../ui/button";
import { AlertTriangle, Camera, ChevronDown, Plus, Upload } from "lucide-react";
import CameraAnalyzer from "../CameraAnalyzer";

export const LandingSection = () => {
    const fileInputRef = useRef(null);
    const streamRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            // Tirar foto após 3 segundos
            setTimeout(() => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                setImage(imageData);

                // Parar a câmera
                stream.getTracks().forEach(track => track.stop());
                setActiveSection('analysis');
            }, 3000);
        } catch (err) {
            console.error("Erro ao acessar câmera:", err);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
            setActiveSection('analysis');
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="max-w-6xl mx-auto p-6">
            {/* Hero Section */}
            <CameraAnalyzer />
            <div className="py-20 text-center text-white">
                <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                    Descubra a Composição Química
                </h1>
                <p className="text-xl mb-12 opacity-90">
                    Analise componentes químicos em tempo real com nossa tecnologia avançada
                </p>
                <div className="space-y-4">
                    <Button
                        onClick={() => startCamera()}
                        className="bg-white text-purple-600 hover:bg-purple-100 px-8 py-6 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        <Camera className="mr-2" size={24} />
                        Iniciar Análise com Câmera
                    </Button>
                    <div className="flex justify-center">
                        <Button
                            onClick={() => fileInputRef.current.click()}
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                        >
                            <Upload className="mr-2" size={24} />
                            Upload de Imagem
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8 py-16">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                    <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <Camera size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Análise em Tempo Real</h3>
                    <p className="opacity-80">Capture imagens e obtenha resultados instantâneos sobre a composição química.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                    <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Avaliação de Risco</h3>
                    <p className="opacity-80">Identificação clara dos níveis de risco de cada componente encontrado.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                    <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <Plus size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Adição Manual</h3>
                    <p className="opacity-80">Adicione componentes manualmente para complementar a análise automática.</p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
                <ChevronDown size={40} className="text-white mx-auto animate-bounce" />
            </div>


        </div>
    </div>
};

// function startCamera(): void {
//     throw new Error("Function not implemented.");
// }


// function handleFileUpload(event: ChangeEvent<HTMLInputElement>): void {
//     throw new Error("Function not implemented.");
// }

