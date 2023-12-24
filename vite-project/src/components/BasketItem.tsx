import { useState } from "react";
import { BasketItemType } from "../shared/types";

type BasketItemProps = {
  basketId: number;
  items: BasketItemType[];
  totalAmount: number;
  datePurchased: string;
};
function BasketItem({
  basketId,
  items,
  totalAmount,
  datePurchased,
}: BasketItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC", // Specify time zone if needed
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const date = new Date(datePurchased);

  // Handle the case where the item is not found
  // ...

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer ${
        isExpanded
          ? "bg-sky-300 hover:bg-sky-500 border-indigo-700 border-2"
          : "bg-sky-50 hover:bg-sky-100"
      }`}
      onClick={(event) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
      }}
    >
      <div
        className={` gap-5 p-4 'bg-sky-100 hover:bg-sky-300 border-indigo-500 border-2' : 'bg-sky-50 hover:bg-sky-100 ${
          isExpanded ? "max-h-full" : "max-h-48"
        }`}
      >
        <h3 className="text-lg font-medium">Basket {basketId}</h3>
        <ul className="mt-2 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-md object-contain"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-gray-500">{item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <p className="text-lg font-medium">
            Total Amount: {currencyFormatter.format(totalAmount)}
          </p>
          <p className="text-gray-500">
            Date Purchased: {formatter.format(date)}
          </p>
        </div>
      </div>
    </div>
  );
}
export default BasketItem;
