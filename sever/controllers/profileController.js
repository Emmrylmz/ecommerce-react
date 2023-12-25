import User from "../models/models.js";


export const retrievePurchaseHistory = async (req, res) => {
    const { userId } = req.body
    const user = await User.findById(userId)

   try{
    if (user) {
        const purchaseHistory = user.purchaseHistory;
        res.send(purchaseHistory)
      }
   }
   catch(error){
    console.error("Error retrieving purchaseHistory" , error)
   }
}