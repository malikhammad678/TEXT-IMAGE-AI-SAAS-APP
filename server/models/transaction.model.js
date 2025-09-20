import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, ref:'User', reqiured:true },
    planId:{type:String, reqiured:true},
    amount:{ type:Number, required:true },
    credits:{type:Number, reqiured:true},
    isPaid: { type:Boolean, default:false }
},{timestamps:true})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export default Transaction;