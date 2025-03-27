import Link from "next/link";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  available: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonLink,
  isPopular = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border ${
        isPopular ? "border-purple-950" : "border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="bg-purple-950 text-white text-center py-3 text-lg font-medium">
          Mais Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-gray-600">/{period}</span>}
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div
                className={`p-1 rounded-full mt-0.5 ${
                  feature.available ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <Check
                  size={14}
                  className={
                    feature.available ? "text-green-600" : "text-gray-400"
                  }
                />
              </div>
              <span
                className={
                  feature.available ? "text-gray-700" : "text-gray-400"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <Link href={buttonLink}>
          <div className="flex justify-center items-center w-full">
            <button
              className={`w-full text-center py-2 px-4 rounded-2xl font-medium ${
                isPopular
                  ? "bg-purple-800 hover:bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-purple-800 hover:text-gray-200 text-gray-800 border border-purple-600"
              } transition-colors`}
            >
              {buttonText}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
