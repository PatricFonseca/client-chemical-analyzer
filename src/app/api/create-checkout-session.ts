import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('passou aqui')
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { plan } = req.body;
    
    // Validação de variáveis de ambiente
    if (!process.env.STRIPE_MONTHLY_PRICE_ID || !process.env.STRIPE_ANNUAL_PRICE_ID) {
      throw new Error('Variáveis de ambiente do Stripe não configuradas');
    }

    let priceId: string;
    switch (plan) {
      case 'monthly':
        priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
        break;
      case 'annual':
        priceId = process.env.STRIPE_ANNUAL_PRICE_ID;
        break;
      default:
        return res.status(400).json({ error: 'Plano inválido' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    res.status(303).redirect(session.url!);
  } catch (error) {
    console.error('Erro no checkout:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Erro interno'
    });
  }
}
