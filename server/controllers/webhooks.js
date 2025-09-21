import Stripe from "stripe";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const stripeWebhooks = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntent = event.data.object;
        const sessionList = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });
        const session = sessionList.data[0];

        const { transactionId, appId } = session.metadata;

        if (appId === "imagify") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false,
          });

          if (transaction) {
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credits: transaction.credits } }
            );
            transaction.isPaid = true;
            await transaction.save();
          }
        }
        break;

      default:
        console.log("Unhandled event type", event.type);
        break;
    }

    return response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return response.status(500).send("Internal server error");
  }
};
