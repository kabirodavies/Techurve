import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
  hideTotal?: boolean; // To hide the total price
  showPrice?: boolean; // To show/hide price based on admin status
}

const PriceView = ({ price, discount, className, hideTotal, showPrice = true }: Props) => {
  // Calculate the final price after discount (discount is a fixed amount, not percentage)
  const numericDiscount = Number(discount) || 0;
  const finalPrice = price ? price - numericDiscount : 0;
  
  // Show "Request Quote" if price is not shown or if final price is 0
  if (!showPrice || !price || finalPrice === 0) {
    return (
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className={cn("text-shop_dark_green font-medium", className)}>
            Request Quote
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter
          amount={finalPrice}
          className={cn("text-shop_dark_green", className)}
        />
        {price && numericDiscount > 0 && !hideTotal && (
          <PriceFormatter
            amount={price}
            className={twMerge(
              "line-through text-xs font-normal text-zinc-500",
              className
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
