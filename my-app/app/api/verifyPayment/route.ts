import crypto from 'crypto'; 
import dotenv from 'dotenv';
dotenv.config();

export async function POST(request: Request){
    // get the body of the request
    const body = await request.json();

    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = body;

    // create the generate signature
    const generatedSignature = 
    crypto
    .createHmac("sha256", process.env.KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
    
    const isValid = razorpay_signature === generatedSignature;

    if(isValid){
        return Response.json({
            success: true
        })
    }

    return Response.json({
        success: false
    });
}