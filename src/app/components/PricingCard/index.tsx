export default function PricingCard({ plan, onSubscribe }) {
    return (
      <div className={styles.pricingCard}>
        <h2>{plan.name}</h2>
        <div className={styles.price}>
          ${plan.price}<span>/mês</span>
        </div>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button onClick={onSubscribe} className={styles.subscribeButton}>
          Assinar
        </button>
      </div>
    );
  }