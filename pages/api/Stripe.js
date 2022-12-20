import Stripe from "stripe";
const stripe = new Stripe(
    "sk_test_51MEQTGK8jKUixGh849ZfwVAgRGJLHj5Gm9DMHDkuSy1FwFrg1Kyb5No8wxXWhh1wNV8kUWe3Lrhipm8udZ3rdcfg00ZZxlAVG2"
)
    
export default async function handler(req,res){
    if(req.method == "POST"){
        try{
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                line_items: req.body.map((items) =>{
                    const img = items.image.asset._ref;
                    const newImage = img.replace(
                        "image-",
                        "https://cdn.sanity.io/images/m0xlrbrg/production/"
                    )
                    .replace("-jpg", ".jpg")
                    return{
                        price_data:{
                            currency: "usd",
                            product_data:{
                                name: items.name,
                                images: [newImage],
                            },
                            unit_amount: items.price * 100
                        },
                        adjustable_quantity:{
                            enabled: false
                        },
                        quantity: items.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancle`
            };
            const session = await stripe.checkout.sessions.create(params);
            console.log(session)
            res.status(200).json(session)

        }catch(error){
            res.status(500).json(error.message)
        }
    }else{
        res.setHeader("Allow", "POST")
        res.status(405).end("Method not allowed")
    }
}