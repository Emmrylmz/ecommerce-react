    import mongoose from "mongoose";

    export const purchaseItemSchema = new mongoose.Schema({
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, min: 1 },
        datePurchased: { type: Date, default: Date.now },
        totalAmount: {type: Number, required: true}
        
    });
    

    const User = mongoose.model('User', new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            
            
        },
        purchaseHistory: [{type: purchaseItemSchema}],

            
    }));




    
    export default User 
    