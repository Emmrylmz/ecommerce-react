    import mongoose from "mongoose";

    export const cartItemSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true
        }, // Use ObjectId
        quantity: {
            type: Number,
            required: true
        },
    });

    export const purchaseItemSchema = new mongoose.Schema({
        items: {
            type: [cartItemSchema]
        },
        datePurchased: {
            type: Date,
            default: Date.now
        },
        totalAmount: {
            type: Number,
            required: true
        }

    });


    const User = mongoose.model('User', new mongoose.Schema({
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
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
        purchaseHistory: [{
            type: purchaseItemSchema
        }],


    }));





    export default User