import User from "../models/user.model.js";
import FormData from "form-data";
import axios from 'axios'

export const generateImage = async (req,res) => {
   try {
    const userId = req.user._id;
    const { prompt } = req.body;
    const user = await User.findById(userId)
    if(!user || !prompt){
        return res.status(400).json({
            success:false,
            message:"Missing Details"
        })
    }

    if(req.user.credits === 0) {
        return res.status(400).json({
            success:false,
            message:"No Credit Balance",
            creditBalance:user.credits
        })
    }

    const formData = new FormData();
formData.append("prompt", prompt);

const { data } = await axios.post(
  "https://clipdrop-api.co/text-to-image/v1",
  formData,
  {
    headers: {
      "x-api-key": process.env.CLIPDROP_API,
      ...formData.getHeaders(),
    },
    responseType: "arraybuffer",
  }
);

const base64image = Buffer.from(data, "binary").toString("base64");
const responseUrl = `data:image/png;base64,${base64image}`;

const updatedUser = await User.findByIdAndUpdate(
  user._id,
  { $inc: { credits: -1 } },
  { new: true }
);

res.status(200).json({
  success: true,
  message: "Image Generated",
  creditBalance: updatedUser.credits,
  image: responseUrl,
});

   } catch (error) {
    console.error(error.message)
        res.status(500).json({
        success:false,
        message:error.message
    })
   }
}