const mongoose = require("mongoose") ;


const transactionSchema = new mongoose.Schema({

    fromAccount : {
        type: mongoose.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a from Account"],
        index: true,
    },

    toAccount : {
        type: mongoose.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a to Account"],
        index: true,
    },

    status : {
        type: String,
        enum :{ 
            values : [ "PENDING", "COMPLETED" , "FAILED", "REVERSED" ],
            message : "status can be either PENDING, COMPLETED , FAILED, REVERSED ",
        } ,
        default: "PENDING"
    },

    amount : {
        type: Number,
        required: [ true, "Amount is required for creating an account" ],
        min: [ 0, "Transaction amount can't be negative"],
    },

    idempotencyKey: {
        type: String,
        required: [ true, " idempotency key is required for creating an account "],
        index: true,
        unique : true,

    }
} ,{
     timestamp : true 
    
})

const transactionModel = mongoose.model( "transaction", transactionSchema);

module.exports = transactionModel ;