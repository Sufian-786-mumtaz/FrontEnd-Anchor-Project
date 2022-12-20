import { client, urlFor } from "../../lib/client"
import { useState } from "react"
import { useDispatch } from "../../store/store"
import Header from "../../Components/Header"
import Image from "next/image"
import { AiFillCaretRight } from "react-icons/ai"
import { AiFillCaretLeft } from "react-icons/ai"
import selected from "../../styles/selected.module.css"
import { addToCart } from "../../store/cartSlice"
import toast, { Toaster } from "react-hot-toast"

const Pizza = ({ pizza }: any) => {
    const dispatch = useDispatch();
    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1);

    // Used to decreas the quantity from the cart
    const decQuantity = () => {
        setQuantity(quantity - 1)
        if (quantity <= 1) {
            setQuantity(1)
        }
    }

    // Used to increase the quantity from the cart
    const incQuantity = () => {
        setQuantity(quantity + 1)
    }

    //Used to add the items from the cart
    const handleAddToCart = () => {
        dispatch(addToCart({ ...pizza, price: pizza.price[size], quantity: quantity, Size: size } as const))
        toast.success(`${pizza.name} Added To Cart`)
    }

    const src = urlFor(pizza.image).url();
    return (
        <div>
            <Header />
            <div className="flex p-8 gap-20  mt-2">
                <div className="relative w-[40%] h-[25rem] overflow-hidden rounded-3xl">
                    <Image
                        loader={() => src}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        src={src} />
                </div>
                <div className="flex flex-col justify-between font-bold text-[2.2rem]">
                    <span className="text-[#2e2e2e]">{pizza.name}</span>
                    <span className="text-[1.2rem] font-normal text-gray-500">{pizza.detail}</span>
                    <span className="text-[#2e2e2e]"><span className="text-red-500">$</span>{pizza.price[size]}</span>
                    <div className="flex gap-12 text-[1.6rem]">
                        <span className="text-[#2e2e2e]">Size</span>
                        <div className="size-varient flex gap-3 text-[0.8rem] font-normal text-red-500">
                            <div onClick={() => setSize(0)} className={size === 0 ? selected.selectSize : ""}>Small</div>
                            <div onClick={() => setSize(1)} className={size === 1 ? selected.selectSize : ""}>Medium</div>
                            <div onClick={() => setSize(2)} className={size === 2 ? selected.selectSize : ""}>Large</div>
                        </div>
                    </div>
                    <div className="flex font-semi text-[1.6rem] gap-12">
                        <span className="text-[#2e2e2e]">Quantity</span>
                        <div className="flex gap-2 items-center">
                            <AiFillCaretLeft className="text-red-500 h-[2.5rem] w-[2.5rem] cursor-pointer" onClick={() => decQuantity()} />
                            <span>{quantity}</span>
                            <AiFillCaretRight className="text-red-500 h-[2.5rem] w-[2.5rem] cursor-pointer" onClick={() => incQuantity()} />
                        </div>
                    </div>
                    <div className="font-normal py-[0.5rem] px-[1rem] text-[1rem] bg-red-500 w-[8rem] rounded-3xl text-white hover:bg-[#2e2e2e] cursor-pointer text-center">
                        <button onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    )
}

//its statically pre render all that paths
export async function getStaticPaths() {
    const paths = await client.fetch(
        '*[_type == "pizza" && defined(slug.current)][].slug.current'
    );
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: "blocking",
    }
}


export async function getStaticProps(content) {
    const { slug = "" } = content.params;
    const pizza = await client.fetch(
        `*[_type == "pizza" && slug.current == '${slug}'][0]`
    )
    return {
        props: {
            pizza,
        },
    };
}

export default Pizza