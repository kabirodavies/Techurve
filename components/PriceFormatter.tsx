import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  // Return null if amount is 0 or undefined
  if (!amount || amount === 0) {
    return null;
  }

  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    currency: "KES",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <span
      className={twMerge("text-sm font-semibold text-darkColor", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
