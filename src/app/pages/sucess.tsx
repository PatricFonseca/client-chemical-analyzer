import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);

  useEffect(() => {
    if (!session_id) return;

    // Aqui você pode adicionar uma chamada para verificar os detalhes da sessão
    // através de uma API no seu backend
    
    // Simulação para exemplo
    setLoading(false);
    setSubscription({
      plan: 'Pro Mensal',
      startDate: new Date().toLocaleDateString(),
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    });
  }, [session_id]);

  if (loading) {
    return (
      <Layout title="Processando pagamento...">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Processando seu pagamento...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Erro no pagamento">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro no processamento</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/pricing">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Voltar para Planos
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pagamento Confirmado">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-green-500 mx-auto w-16 h-16 mb-6">
            <CheckCircle size={64} />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Pagamento Confirmado!</h1>
          
          <p className="text-gray-600 mb-6">
            Agradecemos pela sua assinatura. Seu acesso ao plano Pro foi ativado com sucesso.
          </p>
          
          {subscription && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="font-semibold mb-2">Detalhes da Assinatura</h2>
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Plano:</span> {subscription.plan}</p>
                <p><span className="font-medium">Data de início:</span> {subscription.startDate}</p>
                <p><span className="font-medium">Próxima cobrança:</span> {subscription.nextBilling}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Link href="/analyze">
              <button className="block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Começar a Analisar
              </button>
            </Link>
            
            <Link href="/account">
              <button className="block text-blue-600 hover:underline">
                Gerenciar Assinatura
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;