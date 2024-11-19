import React, { useState, useRef } from 'react';
import { Camera, Upload, Plus, AlertTriangle, Check, X, ChevronDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CaseTypes, ChemicalWordDTO, ProductImageResult } from '@/app/dto/chemicalDto';
import { SearchComponentsByImage } from '@/app/api/searchComponents';
import { chemicalAnalyser } from '@/app/api/chemicalAnalyser';

const ChemicalAnalyzer = () => {
    const [activeSection, setActiveSection] = useState('landing');
    const [image, setImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    // const [chemicals, setChemicals] = useState([]);
    const [newChemical, setNewChemical] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);
    const [tags, setTags] = React.useState<Tag[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const streamRef = useRef(null);

    const { data } = useQuery<ChemicalWordDTO[]>({
        queryKey: ["chemicalAnalyser"],
        // queryFn: () =>
        //   queryClient.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
      });

    const queryClient = useQueryClient();
    

    const mutation = useMutation({
        mutationFn: chemicalAnalyser,
        onSuccess: (data) => {
            queryClient.setQueryData(["chemicalAnalyser"], data);

            console.log("ddd",data)
        },
        onError: (error) => {
            error.message = error ? error.message : "Ocorreu um erro inesperado";
        },
    });

    function handleAnalyse(composition:  string[]) {
        const formattedWords = composition.join(',');//tags.map((tag) => tag.text).join(",");

        mutation.mutate(formattedWords);
    }


    // Simulando dados da API
    const mockApiResponse = [
        { name: 'Ácido Cítrico', risk: 'low', description: 'Conservante natural encontrado em frutas cítricas' },
        { name: 'Benzoato de Sódio', risk: 'medium', description: 'Conservante artificial comum em alimentos processados' }
    ];

    async function handleSearchComponents() {
        if (!imageSrc) return;
    
        setIsloading(true);
    
        try {
          const data: ProductImageResult = await SearchComponentsByImage(imageSrc);

          console.log('comp', data.composition);
    
          const composition = data?.composition?.split(",");
          composition.map((item) => {
            setTags((prevTags) => [...prevTags, { id: item, text: item }]);
          });
    
          await handleAnalyse(composition)

          setIsloading(false);
        } finally {
          setIsloading(false);
        }
      }

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
                setImageSrc(imageData);

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
            setImageSrc(e.target.result);

            setActiveSection('analysis');
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    async function analyzeImage (){
        setIsAnalyzing(true);
        await handleSearchComponents();
        // setTimeout(() => {
        //     // setChemicals(mockApiResponse);
        //     setIsAnalyzing(false);
        // }, 2000);
        setIsAnalyzing(false);
    };

    const addCustomChemical = () => {
        if (newChemical.trim()) {
            setChemicals([...chemicals, {
                name: newChemical,
                risk: 'unknown',
                description: 'Componente adicionado manualmente'
            }]);
            setNewChemical('');
        }
    };

    const getRiskColor = (risk: CaseTypes) => {
        console.log(risk);

        switch (risk) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const LandingSection = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="max-w-6xl mx-auto p-6">
                {/* Hero Section */}
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
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
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
    );

    const AnalysisSection = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white/95 backdrop-blur-lg shadow-xl">
                    <CardContent className="p-6">
                        {image && (
                            <div className="space-y-6">
                                <img
                                    src={image}
                                    alt="Imagem capturada"
                                    className="w-full rounded-lg shadow-lg"
                                />
                                <Button
                                    onClick={analyzeImage}
                                    disabled={isAnalyzing || mutation.isPending }
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold"
                                >
                                    {isAnalyzing ? 'Analisando...' : 'Analisar Imagem'}
                                </Button>
                            </div>
                        )}

                        {data && data.length > 0 && (
                            <div className="space-y-6 mt-8">
                                <h3 className="text-2xl font-bold text-purple-800">
                                    Componentes Identificados
                                </h3>
                                <div className="grid gap-4">
                                    {data.map((chemical, index) => (
                                        <Alert key={index} className="border-l-4 border-l-purple-500">
                                            <AlertTitle className="flex items-center gap-2 text-lg">
                                                {chemical.risk === 'low' ? (
                                                    <Check className="text-green-500" size={24} />
                                                ) : chemical.risk === 'high' ? (
                                                    <AlertTriangle className="text-red-500" size={24} />
                                                ) : (
                                                    <AlertTriangle className="text-yellow-500" size={24} />
                                                )}
                                                {chemical.name}
                                            </AlertTitle>
                                            <AlertDescription className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${getRiskColor(chemical.risk)}`}>
                          {chemical.risk === 'low' ? 'Seguro' :
                              chemical.risk === 'medium' ? 'Atenção' :
                                  chemical.risk === 'high' ? 'Alto Risco' : 'Desconhecido'}
                        </span>
                                                <p className="mt-2 text-gray-600">{chemical.description}</p>
                                            </AlertDescription>
                                        </Alert>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <Input
                                        type="text"
                                        value={newChemical}
                                        onChange={(e) => setNewChemical(e.target.value)}
                                        placeholder="Adicionar componente manualmente"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={addCustomChemical}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        <Plus size={20} />
                                    </Button>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={() => {
                                setActiveSection('landing');
                                setImage(null);
                                setChemicals([]);
                            }}
                            className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            Voltar ao Início
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
    return (
        <div>
            {activeSection === 'landing' ? <LandingSection /> : <AnalysisSection />}
        </div>
    );
};

export default ChemicalAnalyzer;
