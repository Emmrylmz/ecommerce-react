import User from "../models/models.js";



export const checkout = async  (req, res) => { 

  const products = req.data || []; // Define fallback if cache is empty
  console.log(products)
  
    try {
        const { userId, cartItems } = req.body;
        const user = await User.findById(userId).populate('purchaseHistory'); // Fetch user with populated purchases
    
        const purchasedProducts = await Promise.all(
          cartItems.map(async ({ productId, quantity }) => {
            const product = await products.findById(productId);
            if (!product) {
              throw new Error(`Product with ID ${productId} not found.`);
            }
            return {
              product: product,
              quantity,
              subTotal: product.price * quantity,
            };
          })
        );
    
        const totalAmount = purchasedProducts.reduce((sum, { subTotal }) => sum + subTotal, 0);
    
        user.purchaseHistory.push({
          datePurchased: new Date(),
          items: purchasedProducts,
          totalAmount,
        });
    
        await user.save();
    
        res.send({ message: 'Purchase successful!', orderDetails: user.purchaseHistory[user.purchaseHistory.length - 1] });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }