import { useState, useEffect } from "react";
import axios from "axios";
import { useProductData } from "../context/FetchData";
import BasketItem from "../components/BasketItem";

function Profile() {
  const url = "http://localhost:3000/profile";
  const [purchaseHistory, setPurchaseHistory] = useState(null);
  const localStorageData = localStorage.getItem("currentUser");
  const parsedUser = JSON.parse(localStorageData!);
  const { data } = useProductData();
  let purchased: JSX.Element[] = [];

  const fetchProfile = async () => {
    const retrievePurchaseHistory = await axios.post(url, {
      userId: parsedUser.user.userid,
    });
    if (retrievePurchaseHistory.status === 200) {
      setPurchaseHistory(retrievePurchaseHistory.data);
    } else {
      console.error("error fetching", retrievePurchaseHistory.data.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [url]);

  console.log(purchaseHistory);
  if (purchaseHistory && purchaseHistory.length > 0 && data) {
    const mapItems = purchaseHistory?.map((basket: any) => ({
      basketId: basket._id,
      datePurchased: basket.datePurchased,
      totalAmount: basket.totalAmount,
      items: basket.items.map((item: any) => {
        const foundItem = data?.find((innerData) => innerData.id === item.id);
        return foundItem ? { ...foundItem, quantity: item.quantity } : null; // Handle cases where foundItem is null
      }),
    }));
    purchased = mapItems.map((itemGroup: any) => (
      <BasketItem
        key={itemGroup.id}
        basketId={itemGroup.basketId}
        items={itemGroup.items}
        totalAmount={itemGroup.totalAmount}
        datePurchased={itemGroup.datePurchased}
      />
    ));
  }
  return (
    <>
      <div className="container mx-auto pt-20 w-4/5">
        <div className="grid grid-cols-1 gap-4">
          {purchased.length > 0 ? purchased : <div>Loading</div>}
        </div>
      </div>
    </>
  );
}

export default Profile;
