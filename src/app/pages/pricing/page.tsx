import Layout from '../../components/Layout';
import PricingCard from '../../components/PricingCard';

const PricingPage = () => {
  const plans = [
    {
      title: 'Básico',
      price: 'Grátis',
      period: '',
      description: 'Para usuários ocasionais.',
      features: [
        { text: '5 análises por dia', available: true },
        { text: 'Informações nutricionais básicas', available: true },
        { text: 'Detecção de alergênicos', available: true },
        { text: 'Histórico de 7 dias', available: true },
        { text: 'Exportação de dados', available: false },
        { text: 'Análises offline', available: false },
        { text: 'Suporte prioritário', available: false },
      ],
      buttonText: 'Começar Grátis',
      buttonLink: '/register',
      isPopular: false,
    },
    {
      title: 'Pro',
      price: 'R$ 29,90',
      period: 'mês',
      description: 'Para uso regular e recursos avançados.',
      features: [
        { text: 'Análises ilimitadas', available: true },
        { text: 'Informações nutricionais completas', available: true },
        { text: 'Detecção de alergênicos', available: true },
        { text: 'Histórico ilimitado', available: true },
        { text: 'Exportação de dados', available: true },
        { text: 'Análises offline', available: true },
        { text: 'Suporte prioritário', available: false },
      ],
      buttonText: 'Assinar Agora',
      buttonLink: '/api/create-checkout-session?plan=monthly',
      isPopular: true,
    },
    {
      title: 'Business',
      price: 'R$ 299,90',
      period: 'mês',
      description: 'Para empresas e uso profissional.',
      features: [
        { text: 'Análises ilimitadas', available: true },
        { text: 'Informações nutricionais completas', available: true },
        { text: 'Detecção de alergênicos', available: true },
        { text: 'Histórico ilimitado', available: true },
        { text: 'Exportação de dados', available: true },
        { text: 'Análises offline', available: true },
        { text: 'Suporte prioritário', available: true },
        { text: 'API de acesso', available: true },
        { text: 'Gerenciamento de equipe', available: true },
      ],
      buttonText: 'Contato Comercial',
      buttonLink: '/contact-sales',
      isPopular: false,
    },
  ];

  return (
    <Layout title="Planos e Preços - IngredientScan">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Escolha o Plano Ideal Para Você</h1>
          <p className="text-gray-600 text-lg">
            Oferecemos opções flexíveis para atender às suas necessidades. Comece gratuitamente ou escolha um plano pago para recursos avançados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonLink={plan.buttonLink}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
          
          <div className="mt-8 space-y-8 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">Posso trocar de plano a qualquer momento?</h3>
              <p className="text-gray-600">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A cobrança será ajustada proporcionalmente.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Existe um período de teste para os planos pagos?</h3>
              <p className="text-gray-600">
                Sim, oferecemos 7 dias de teste gratuito para o plano Pro. Você não será cobrado se cancelar antes do fim do período de teste.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Como funciona o recurso de análise offline?</h3>
              <p className="text-gray-600">
                O recurso de análise offline permite que você utilize o app mesmo sem conexão à internet. As análises são sincronizadas quando você reconectar.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Quais métodos de pagamento são aceitos?</h3>
              <p className="text-gray-600">
                Aceitamos cartões de crédito/débito (Visa, Mastercard, American Express, Elo) e PIX para pagamentos mensais e anuais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;