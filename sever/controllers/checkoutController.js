import User from "../models/models.js";
import client from "../redis.js";



export const checkout = async (req, res) => {
  const cachedProducts = await client.get("1")
  const parsed = JSON.parse(cachedProducts)

  try {
    const { userId, cartItems } = req.body;
    

    
    // Fetch user with populated purchases
    const user = await User.findById(userId).populate('purchaseHistory');

    const purchasedProducts = await Promise.all(
      cartItems.map(({ id: productId, quantity }) => {
        const product =  parsed.find((object) => object.id === productId);
        
        if (!product) {
          throw new Error(`Product with ID ${productId} not found.`);
        }

        return {
          id: productId,
          quantity,
          subTotal: product.price * quantity,
        };
      })
    );

    const totalAmount = purchasedProducts.reduce((sum, { subTotal }) => sum + subTotal, 0);

    const newPurchase = {
      datePurchased: new Date(),
      items: purchasedProducts,
      totalAmount: totalAmount,
    };

    user.purchaseHistory.push(newPurchase);
    await user.save();

    res.status(200).json({
      message: 'Purchase successful!',
      orderDetails: user.purchaseHistory[user.purchaseHistory.length - 1],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};