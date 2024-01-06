import { useState, useEffect } from "react";
import axios from "axios";
import { useProductData } from "../context/FetchData";
import BasketItem from "../components/BasketItem";
import { useSidebarContext } from "../context/sidebarContext";
import { profileSortingCategory } from "../components/Sidebar";


interface PurchaseHistoryItem {
  _id: string;
  datePurchased: string; // Assuming datePurchased is a string
  totalAmount: number;
  items: any[]; // Adjust the type of items as needed
}

function Profile() {
  const url = "http://localhost:3000/profile";
  const [purchaseHistory, setPurchaseHistory] = useState<object[] | null>(null);
  const localStorageData = localStorage.getItem("currentUser");
  const parsedUser = JSON.parse(localStorageData!);
  const { data } = useProductData();
  const { setPage, setFilter, getFilter } = useSidebarContext();
  const filter = getFilter()
  let purchased: JSX.Element[] = [];
  let filtered: PurchaseHistoryItem[] = [];

  const sortPurchaseHistory = (
    purchaseHistory: PurchaseHistoryItem[],
    filterCriteria: string
  ): PurchaseHistoryItem[] => {
    switch (filterCriteria) {
      case profileSortingCategory[0]:
        return purchaseHistory.sort(
          (a, b) =>
            new Date(a.datePurchased).getTime() - new Date(b.datePurchased).getTime()
        );
        case profileSortingCategory[1]:
          return purchaseHistory.sort(
            (a,b) => new Date(b.datePurchased).getTime() - new Date(a.datePurchased).getTime()
          )
      case profileSortingCategory[2]:
        return purchaseHistory.sort(
          (a, b) => b.totalAmount - a.totalAmount);
          case profileSortingCategory[3]:
            return purchaseHistory.sort(
              (a,b) => a.totalAmount - b.totalAmount
            )
      default:
        return purchaseHistory;
    }
  };

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
    setFilter("");
    setPage("profile");
  }, [url]);

  if (purchaseHistory && purchaseHistory.length > 0 && data) {

    if (filter !== "") {
       filtered = sortPurchaseHistory(purchaseHistory,filter)
    }
    const mapItems = purchaseHistory?.map((basket: any) => ({
      basketId: basket._id,
      datePurchased: basket.datePurchased,
      totalAmount: basket.totalAmount,
      items: basket.items.map((item: any) => {
        const foundItem = data?.find((innerData) => innerData.id === item.id);
        return foundItem ? { ...foundItem, quantity: item.quantity } : null; // Handle cases where foundItem is null
      }),
    }));
    purchased = mapItems.map((itemGroup: any, index:number) => (
      <div key={index}>
        <BasketItem
          key={itemGroup.id}
          basketId={itemGroup.basketId}
          items={itemGroup.items}
          totalAmount={itemGroup.totalAmount}
          datePurchased={itemGroup.datePurchased}
        />
      </div>
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
