import Transaction from "../models/transaction.model.js"
import Stripe from 'stripe'

const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    }
]

export const getAllPlans = async (req,res) => {
    try {
        res.status(200).json({ success:true, plans })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
    })
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const purchasePlan = async (req,res) => {
    try {
        const { planId } = req.body; 
        const userId = req.user._id
        const plan = plans.find(plan => plan.id === planId)
        if(!plan){
            return res.status(400).json({
                success:false,
                message:"Inavlid Plan"
            })
        }

        const transaction = await Transaction.create({
            userId:userId,
            planId:plan.id,
            amount:plan.price,
            credits:plan.credits,
            isPaid:false
        })

        const { origin } = req.headers;

        const session = await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                        currency:'usd',
                        unit_amount:plan.price * 100,
                        product_data:{
                            name:plan.id
                        }
                    },
                    quantity:1,
                },
            ],
            mode:'payment',
            success_url:`${origin}/loading`,
            cancel_url:`${origin}`,
            metadata:{transactionId: transaction._id.toString(), appId:'imagify'},
        })

        res.json({
            success:true,
            url:session.url
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
    })
    }
}