import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();


console.log("key:",process.env.KEY_ID);
// create the Razorpay instance 
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

export async function POST(){
    try{
        const order = await razorpay.orders.create({
        amount: 500 * 100,
        currency: "INR"
    });

        // console.log("order:", order);
        return Response.json({
            success: true,
            order
        })
    }catch(error:any){
        return Response.json({
            error: error.message
        })
    }
    
}